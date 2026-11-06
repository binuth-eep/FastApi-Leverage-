package com.academy.studentapi.student;

import java.util.List;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
public class StudentService {
    private final StudentRepository repository;
    public StudentService(StudentRepository repository) { this.repository = repository; }

    public List<StudentResponse> list() {
        return repository.findAll(Sort.by("id")).stream().map(StudentResponse::from).toList();
    }
    public StudentResponse get(long id) { return StudentResponse.from(find(id)); }
    @Transactional
    public StudentResponse create(StudentInput input) {
        if (repository.existsByEmail(input.email())) { throw new DuplicateEmailException(); }
        Student saved = repository.saveAndFlush(new Student(input.name(), input.email()));
        return StudentResponse.from(saved);
    }
    @Transactional
    public StudentResponse update(long id, StudentInput input) {
        Student student = find(id);
        if (repository.existsByEmailAndIdNot(input.email(), id)) { throw new DuplicateEmailException(); }
        student.update(input.name(), input.email());
        return StudentResponse.from(repository.saveAndFlush(student));
    }
    @Transactional
    public void delete(long id) {
        repository.delete(find(id));
        repository.flush();
    }
    private Student find(long id) {
        return repository.findById(id).orElseThrow(() -> new StudentNotFoundException(id));
    }
}
