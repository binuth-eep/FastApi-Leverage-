package com.academy.studentapi.student;

public class StudentNotFoundException extends RuntimeException {
    public StudentNotFoundException(long id) { super("Student " + id + " was not found."); }
}
