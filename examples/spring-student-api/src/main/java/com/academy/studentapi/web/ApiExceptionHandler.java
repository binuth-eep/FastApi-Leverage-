package com.academy.studentapi.web;

import java.util.Map;
import java.util.TreeMap;
import com.academy.studentapi.student.DuplicateEmailException;
import com.academy.studentapi.student.StudentNotFoundException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.HandlerMethodValidationException;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

@RestControllerAdvice
public class ApiExceptionHandler {
    @ExceptionHandler(StudentNotFoundException.class)
    ResponseEntity<ApiError> missing(StudentNotFoundException error) { return response(404, error.getMessage(), Map.of()); }
    @ExceptionHandler(DuplicateEmailException.class)
    ResponseEntity<ApiError> duplicate(DuplicateEmailException error) { return response(409, error.getMessage(), Map.of()); }
    @ExceptionHandler(DataIntegrityViolationException.class)
    ResponseEntity<ApiError> integrity(DataIntegrityViolationException error) {
        // The database constraint still protects against concurrent duplicate requests.
        return response(409, "Student data conflicts with an existing record.", Map.of());
    }
    @ExceptionHandler(MethodArgumentNotValidException.class)
    ResponseEntity<ApiError> validation(MethodArgumentNotValidException error) {
        Map<String, String> fields = new TreeMap<>();
        error.getBindingResult().getFieldErrors().forEach(field -> fields.putIfAbsent(field.getField(), field.getDefaultMessage()));
        return response(400, "Check the student fields.", fields);
    }
    @ExceptionHandler({HttpMessageNotReadableException.class, MethodArgumentTypeMismatchException.class, HandlerMethodValidationException.class})
    ResponseEntity<ApiError> malformed(Exception error) { return response(400, "Invalid request body or student ID.", Map.of()); }
    private ResponseEntity<ApiError> response(int status, String message, Map<String, String> fields) {
        return ResponseEntity.status(status).body(new ApiError(status, message, fields));
    }
}
