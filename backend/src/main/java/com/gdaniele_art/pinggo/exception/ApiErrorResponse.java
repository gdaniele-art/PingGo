package com.gdaniele_art.pinggo.exception;

import java.time.Instant;
import java.util.Map;

public class ApiErrorResponse {

    private int status;
    private String message;
    private Map<String, String> errors;
    private Instant timestamp;

    public ApiErrorResponse(int status, String message, Map<String, String> errors) {
        this.status = status;
        this.message = message;
        this.errors = errors;
        this.timestamp = Instant.now();
    }

    public int getStatus() {
        return status;
    }

    public String getMessage() {
        return message;
    }

    public Map<String, String> getErrors() {
        return errors;
    }

    public Instant getTimestamp() {
        return timestamp;
    }
}
