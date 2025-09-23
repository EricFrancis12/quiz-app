package com.example.demo.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.resource.NoResourceFoundException;

import com.example.demo.dto.APIResponse;
import com.example.demo.util.FrontendUtil;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handleException(Exception ex) {
        if (ex instanceof UnauthorizedException) {
            return APIResponse.unauthorized();
        }

        // If a matching static file is not found this exception will be thrown,
        // so let the frontend check if it has any routes that match.
        if (ex instanceof NoResourceFoundException) {
            return FrontendUtil.serveFrontend();
        }

        String message;
        if (ex == null) {
            message = "An unknown error occurred";
        } else {
            message = "An unexpected error occurred: " + ex.getMessage();
        }
        System.err.println(message);

        return APIResponse.internalServerError();
    }

}
