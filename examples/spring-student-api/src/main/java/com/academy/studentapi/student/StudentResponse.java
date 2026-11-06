package com.academy.studentapi.student;

public record StudentResponse(Long id, String name, String email) {
    public static StudentResponse from(Student student) {
        return new StudentResponse(student.getId(), student.getName(), student.getEmail());
    }
}
