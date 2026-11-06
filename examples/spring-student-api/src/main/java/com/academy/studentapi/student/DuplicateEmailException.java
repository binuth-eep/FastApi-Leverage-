package com.academy.studentapi.student;

public class DuplicateEmailException extends RuntimeException {
    public DuplicateEmailException() { super("This email is already in use."); }
}
