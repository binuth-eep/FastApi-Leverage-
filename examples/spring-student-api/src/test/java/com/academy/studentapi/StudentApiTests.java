package com.academy.studentapi;

import com.academy.studentapi.student.Student;
import com.academy.studentapi.student.StudentRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasKey;
import static org.hamcrest.Matchers.hasSize;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class StudentApiTests {
    @Autowired MockMvc mvc;
    @Autowired StudentRepository repository;
    @BeforeEach void reset() { repository.deleteAll(); }

    @Test void emptyListIsAnArray() throws Exception {
        mvc.perform(get("/api/students")).andExpect(status().isOk()).andExpect(content().json("[]"));
    }
    @Test void createNormalizesAndPersistsCanonicalRecord() throws Exception {
        mvc.perform(post("/api/students").contentType(MediaType.APPLICATION_JSON)
            .content("{\"name\":\"  Amali  \",\"email\":\" AMALI@EXAMPLE.COM \"}"))
            .andExpect(status().isCreated()).andExpect(header().exists("Location"))
            .andExpect(jsonPath("$.id").isNumber()).andExpect(jsonPath("$.name").value("Amali"))
            .andExpect(jsonPath("$.email").value("amali@example.com"));
        assertThat(repository.findAll()).hasSize(1);
    }
    @Test void invalidFieldsDoNotWrite() throws Exception {
        mvc.perform(post("/api/students").contentType(MediaType.APPLICATION_JSON)
            .content("{\"name\":\"   \",\"email\":\"bad\"}"))
            .andExpect(status().isBadRequest()).andExpect(jsonPath("$.errors", hasKey("name")))
            .andExpect(jsonPath("$.errors", hasKey("email")));
        assertThat(repository.count()).isZero();
    }
    @Test void missingFieldsAndMalformedJsonAreBadRequests() throws Exception {
        mvc.perform(post("/api/students").contentType(MediaType.APPLICATION_JSON).content("{}"))
            .andExpect(status().isBadRequest());
        mvc.perform(post("/api/students").contentType(MediaType.APPLICATION_JSON).content("{broken"))
            .andExpect(status().isBadRequest()).andExpect(jsonPath("$.status").value(400));
    }
    @Test void duplicateEmailReturnsConflict() throws Exception {
        repository.saveAndFlush(new Student("Amali", "amali@example.com"));
        mvc.perform(post("/api/students").contentType(MediaType.APPLICATION_JSON)
            .content("{\"name\":\"Another\",\"email\":\"AMALI@EXAMPLE.COM\"}"))
            .andExpect(status().isConflict()).andExpect(jsonPath("$.status").value(409));
        assertThat(repository.count()).isEqualTo(1);
    }
    @Test void patchUpdatesExistingRecordAndReturnsCanonicalResponse() throws Exception {
        Student saved = repository.saveAndFlush(new Student("Amali", "amali@example.com"));
        mvc.perform(patch("/api/students/" + saved.getId()).contentType(MediaType.APPLICATION_JSON)
            .content("{\"name\":\"Amali Perera\",\"email\":\"amali@example.com\"}"))
            .andExpect(status().isOk()).andExpect(jsonPath("$.name").value("Amali Perera"));
        mvc.perform(get("/api/students/" + saved.getId())).andExpect(status().isOk())
            .andExpect(jsonPath("$.name").value("Amali Perera"));
        assertThat(repository.count()).isEqualTo(1);
    }
    @Test void patchRejectsAnotherStudentsEmailWithoutChangingTheRecord() throws Exception {
        Student first = repository.saveAndFlush(new Student("Amali", "amali@example.com"));
        Student second = repository.saveAndFlush(new Student("Nimal", "nimal@example.com"));
        mvc.perform(patch("/api/students/" + second.getId()).contentType(MediaType.APPLICATION_JSON)
            .content("{\"name\":\"Changed\",\"email\":\"amali@example.com\"}"))
            .andExpect(status().isConflict());
        assertThat(repository.findById(second.getId()).orElseThrow().getName()).isEqualTo("Nimal");
    }
    @Test void deleteReturnsNoContentAndRemovesTheRecord() throws Exception {
        Student saved = repository.saveAndFlush(new Student("Amali", "amali@example.com"));
        mvc.perform(delete("/api/students/" + saved.getId())).andExpect(status().isNoContent())
            .andExpect(content().string(""));
        mvc.perform(get("/api/students")).andExpect(jsonPath("$", hasSize(0)));
    }
    @Test void missingStudentsReturn404() throws Exception {
        mvc.perform(get("/api/students/999999")).andExpect(status().isNotFound());
        mvc.perform(delete("/api/students/999999")).andExpect(status().isNotFound());
        mvc.perform(patch("/api/students/999999").contentType(MediaType.APPLICATION_JSON)
            .content("{\"name\":\"Valid\",\"email\":\"valid@example.com\"}"))
            .andExpect(status().isNotFound());
    }
    @Test void invalidPathIdsReturn400() throws Exception {
        for (String id : new String[]{"0", "-1", "abc", "9007199254740992"}) {
            mvc.perform(get("/api/students/" + id)).andExpect(status().isBadRequest());
        }
    }
    @Test void approvedCorsPreflightIsHandled() throws Exception {
        mvc.perform(options("/api/students").header("Origin", "http://localhost:4200")
            .header("Access-Control-Request-Method", "POST").header("Access-Control-Request-Headers", "Content-Type"))
            .andExpect(status().isOk()).andExpect(header().string("Access-Control-Allow-Origin", "http://localhost:4200"));
    }
    @Test void healthEndpointDoesNotExposeDatabaseDetails() throws Exception {
        mvc.perform(get("/actuator/health")).andExpect(status().isOk())
            .andExpect(jsonPath("$.status").value("UP")).andExpect(jsonPath("$.components").doesNotExist());
    }
}
