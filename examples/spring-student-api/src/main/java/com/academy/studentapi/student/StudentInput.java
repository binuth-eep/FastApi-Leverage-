package com.academy.studentapi.student;

import java.util.Locale;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record StudentInput(
    @NotBlank @Size(min = 2, max = 80) String name,
    @NotBlank @Email @Size(max = 254)
    @Pattern(regexp = "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$") String email
) {
    // The teaching contract trims both fields and lowercases the complete email.
    public StudentInput {
        name = name == null ? null : name.trim();
        email = email == null ? null : email.trim().toLowerCase(Locale.ROOT);
    }
}
