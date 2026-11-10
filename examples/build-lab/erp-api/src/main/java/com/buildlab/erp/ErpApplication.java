package com.buildlab.erp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.jdbc.core.JdbcTemplate;

@SpringBootApplication
public class ErpApplication {
  public static void main(String[] args) { SpringApplication.run(ErpApplication.class, args); }

  @Bean
  CommandLineRunner seed(JdbcTemplate db) {
    return args -> {
      if (db.queryForObject("SELECT COUNT(*) FROM products", Long.class) == 0) {
        db.update("INSERT INTO products(name, price_minor, stock) VALUES (?, ?, ?)", "Notebook", 45000, 3);
        db.update("INSERT INTO products(name, price_minor, stock) VALUES (?, ?, ?)", "Everyday mug", 65000, 4);
        db.update("INSERT INTO products(name, price_minor, stock) VALUES (?, ?, ?)", "Canvas tote", 120000, 8);
        db.update("INSERT INTO products(name, price_minor, stock) VALUES (?, ?, ?)", "Desk planter", 85000, 6);
      }
    };
  }
}
