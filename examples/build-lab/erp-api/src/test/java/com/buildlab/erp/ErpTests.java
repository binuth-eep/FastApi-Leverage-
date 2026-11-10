package com.buildlab.erp;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.httpBasic;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest(properties={"spring.datasource.url=jdbc:h2:mem:erp-test;MODE=PostgreSQL;DATABASE_TO_LOWER=TRUE;DB_CLOSE_DELAY=-1","MANAGER_USERNAME=manager","MANAGER_PASSWORD=test-manager-password","STAFF_USERNAME=staff","STAFF_PASSWORD=test-staff-password"})
@AutoConfigureMockMvc
class ErpTests {
  @Autowired MockMvc mvc;
  @Autowired JdbcTemplate db;
  @BeforeEach void clean(){
    db.update("DELETE FROM audit_events");db.update("DELETE FROM request_items");db.update("DELETE FROM purchase_requests");
    db.update("UPDATE products SET stock=3,price_minor=45000 WHERE id=1");
    db.update("UPDATE products SET stock=4 WHERE id=2");
  }
  private long create(String body) throws Exception {
    mvc.perform(post("/api/requests").with(httpBasic("staff","test-staff-password")).header("X-Build-Lab","1").contentType(MediaType.APPLICATION_JSON).content(body)).andExpect(status().isCreated()).andExpect(jsonPath("$.status").value("PENDING"));
    return db.queryForObject("SELECT MAX(id) FROM purchase_requests",Long.class);
  }
  @Test void publicCatalogAndHealth() throws Exception {
    mvc.perform(get("/api/products")).andExpect(status().isOk()).andExpect(jsonPath("$[0].price_minor").value(45000));
    mvc.perform(get("/api/health")).andExpect(status().isOk()).andExpect(jsonPath("$.status").value("ok"));
    mvc.perform(get("/api/ready")).andExpect(status().isOk());
  }
  @Test void requestAndApprovalAreSeparate() throws Exception {
    long id=create("{\"items\":[{\"product_id\":1,\"quantity\":2}]}");
    assertThat(db.queryForObject("SELECT stock FROM products WHERE id=1",Long.class)).isEqualTo(3);
    mvc.perform(post("/api/requests/"+id+"/approve").with(httpBasic("manager","test-manager-password")).header("X-Build-Lab","1").contentType(MediaType.APPLICATION_JSON).content("{}")).andExpect(status().isOk()).andExpect(jsonPath("$.total_minor").value(90000));
    assertThat(db.queryForObject("SELECT stock FROM products WHERE id=1",Long.class)).isEqualTo(5);
    mvc.perform(post("/api/requests/"+id+"/approve").with(httpBasic("manager","test-manager-password")).header("X-Build-Lab","1")).andExpect(status().isConflict());
    assertThat(db.queryForObject("SELECT stock FROM products WHERE id=1",Long.class)).isEqualTo(5);
    assertThat(db.queryForObject("SELECT COUNT(*) FROM audit_events WHERE action='APPROVED'",Long.class)).isEqualTo(1);
  }
  @Test void staffCannotApprove() throws Exception {
    long id=create("{\"items\":[{\"product_id\":1,\"quantity\":1}]}");
    mvc.perform(post("/api/requests/"+id+"/approve").with(httpBasic("staff","test-staff-password")).header("X-Build-Lab","1")).andExpect(status().isForbidden());
  }
  @Test void missingIdentityOrWriteHeader() throws Exception {
    mvc.perform(get("/api/requests")).andExpect(status().isUnauthorized());
    mvc.perform(post("/api/requests").with(httpBasic("staff","test-staff-password")).contentType(MediaType.APPLICATION_JSON).content("{\"items\":[{\"product_id\":1,\"quantity\":1}]}" )).andExpect(status().isForbidden());
  }
  @Test void invalidQuantityAndExtraPriceAreRejected() throws Exception {
    for(String json:new String[]{"{\"items\":[{\"product_id\":1,\"quantity\":0}]}","{\"items\":[{\"product_id\":1,\"quantity\":1.5}]}","{\"items\":[{\"product_id\":1,\"quantity\":1}],\"total_minor\":1}"}){
      mvc.perform(post("/api/requests").with(httpBasic("staff","test-staff-password")).header("X-Build-Lab","1").contentType(MediaType.APPLICATION_JSON).content(json)).andExpect(status().isBadRequest());
    }
  }
  @Test void unknownProductRollsBackRequest() throws Exception {
    mvc.perform(post("/api/requests").with(httpBasic("staff","test-staff-password")).header("X-Build-Lab","1").contentType(MediaType.APPLICATION_JSON).content("{\"items\":[{\"product_id\":1,\"quantity\":1},{\"product_id\":999,\"quantity\":1}]}" )).andExpect(status().isNotFound());
    assertThat(db.queryForObject("SELECT COUNT(*) FROM purchase_requests",Long.class)).isZero();
    assertThat(db.queryForObject("SELECT COUNT(*) FROM request_items",Long.class)).isZero();
  }
  @Test void failedSecondStockUpdateRollsBackApprovalAndFirstUpdate() throws Exception {
    long id=create("{\"items\":[{\"product_id\":1,\"quantity\":2},{\"product_id\":2,\"quantity\":2}]}");
    db.update("UPDATE products SET stock=1000000 WHERE id=2");
    mvc.perform(post("/api/requests/"+id+"/approve").with(httpBasic("manager","test-manager-password")).header("X-Build-Lab","1")).andExpect(status().isConflict());
    assertThat(db.queryForObject("SELECT stock FROM products WHERE id=1",Long.class)).isEqualTo(3);
    assertThat(db.queryForObject("SELECT status FROM purchase_requests WHERE id=?",String.class,id)).isEqualTo("PENDING");
  }
}
