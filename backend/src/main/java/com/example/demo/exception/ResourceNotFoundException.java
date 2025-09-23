package com.example.demo.exception;

public class ResourceNotFoundException extends RuntimeException {

    public ResourceNotFoundException(String message) {
        super(message);
    }

    public static ResourceNotFoundException format(String format, Object... args) {
        return new ResourceNotFoundException(String.format(format, args));
    }

}
