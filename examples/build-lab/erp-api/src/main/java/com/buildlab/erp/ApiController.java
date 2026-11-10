package com.buildlab.erp;

import static com.buildlab.erp.Contracts.*;
import jakarta.validation.Valid;
import java.security.Principal;
import java.util.List;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class ApiController {
  private final PurchaseService service;
  private final JdbcTemplate db;
  public ApiController(PurchaseService service, JdbcTemplate db) { this.service=service; this.db=db; }
  @GetMapping("/health") public Map<String,String> health(){return Map.of("status","ok");}
  @GetMapping("/ready") public Map<String,String> ready(){db.queryForObject("SELECT COUNT(*) FROM products", Long.class);return Map.of("status","ready");}
  @GetMapping("/products") public List<Product> products(){return service.products();}
  @PostMapping("/products") @ResponseStatus(HttpStatus.CREATED) @PreAuthorize("hasRole('MANAGER')")
  public Product createProduct(@Valid @RequestBody ProductInput input){return service.createProduct(input);}
  @PatchMapping("/products/{id}") @PreAuthorize("hasRole('MANAGER')")
  public Product patchProduct(@PathVariable long id,@Valid @RequestBody ProductPatch input){return service.editProduct(id,input);}
  @GetMapping("/requests") public List<SavedRequest> history(){return service.history();}
  @PostMapping("/requests") @ResponseStatus(HttpStatus.CREATED)
  public SavedRequest create(@Valid @RequestBody CreateRequest payload, Principal user){return service.create(payload,user.getName());}
  @PostMapping("/requests/{id}/approve") @PreAuthorize("hasRole('MANAGER')")
  public SavedRequest approve(@PathVariable long id,Principal user){return service.approve(id,user.getName());}
}
