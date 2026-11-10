package com.buildlab.erp;

import java.util.Map;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

@RestControllerAdvice
public class ApiErrors {
  @ExceptionHandler(DomainException.class)
  ResponseEntity<Map<String,String>> domain(DomainException error){return ResponseEntity.status(error.status()).body(Map.of("detail",error.getMessage()));}
  @ExceptionHandler({MethodArgumentNotValidException.class,HttpMessageNotReadableException.class})
  ResponseEntity<Map<String,String>> invalid(Exception error){return ResponseEntity.badRequest().body(Map.of("detail","Invalid request fields or quantities"));}
}
