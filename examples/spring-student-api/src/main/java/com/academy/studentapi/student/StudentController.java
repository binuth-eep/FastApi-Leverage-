package com.academy.studentapi.student;

import java.net.URI;
import java.util.List;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Positive;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/students")
public class StudentController {
    private final StudentService service;
    public StudentController(StudentService service) { this.service = service; }
    @GetMapping
    public List<StudentResponse> list() { return service.list(); }
    @GetMapping("/{id}")
    public StudentResponse get(@PathVariable @Positive @Max(9007199254740991L) long id) { return service.get(id); }
    @PostMapping
    public ResponseEntity<StudentResponse> create(@Valid @RequestBody StudentInput input) {
        StudentResponse student = service.create(input);
        return ResponseEntity.created(URI.create("/api/students/" + student.id())).body(student);
    }
    // This contract requires both editable fields in each PATCH request.
    @PatchMapping("/{id}")
    public StudentResponse update(@PathVariable @Positive @Max(9007199254740991L) long id, @Valid @RequestBody StudentInput input) {
        return service.update(id, input);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable @Positive @Max(9007199254740991L) long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
