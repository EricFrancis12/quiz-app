package com.example.demo.exception;

public class MissingEnvironmentVariableException extends RuntimeException {

    public MissingEnvironmentVariableException(String name) {
        super(name + " environment variable is not set or is empty");
    }

}
