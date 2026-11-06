package com.academy.studentapi.web;

import java.util.Map;

public record ApiError(int status, String message, Map<String, String> errors) { }
