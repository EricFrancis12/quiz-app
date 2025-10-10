package com.example.quizapp.dto;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import jakarta.servlet.http.HttpServletResponse;

public class APIResponse<T> {

    private boolean success;
    private String error;
    private T data;

    public APIResponse() {
    }

    public APIResponse(boolean success, T data) {
        this.success = success;
        this.data = data;
    }

    public static <T> APIResponse<T> error(String error) {
        APIResponse<T> response = new APIResponse<>(false, null);
        response.error = error;
        return response;
    }

    public static <T> APIResponse<T> success(T data) {
        return new APIResponse<>(true, data);
    }

    public ResponseEntity<APIResponse<T>> entity(HttpStatus status) {
        return ResponseEntity.status(status).body(this);
    }

    public static <T> ResponseEntity<APIResponse<T>> ok(T data) {
        return APIResponse.success(data).entity(HttpStatus.OK);
    }

    public static <T> ResponseEntity<APIResponse<T>> redirect(
            String url, HttpServletResponse response) {
        response.setStatus(HttpStatus.FOUND.value());
        response.setHeader("Location", url);
        return null;
    }

    public static <T> ResponseEntity<APIResponse<T>> badRequest() {
        return APIResponse
                .<T>error("Bad request")
                .entity(HttpStatus.BAD_REQUEST);
    }

    public static <T> ResponseEntity<APIResponse<T>> unauthorized() {
        return APIResponse
                .<T>error("Unauthorized")
                .entity(HttpStatus.UNAUTHORIZED);
    }

    public static <T> ResponseEntity<APIResponse<T>> notFound() {
        return notFound("Resource not found");
    }

    public static <T> ResponseEntity<APIResponse<T>> notFound(String error) {
        return APIResponse
                .<T>error(error)
                .entity(HttpStatus.NOT_FOUND);
    }

    public static <T> ResponseEntity<APIResponse<T>> conflict() {
        return APIResponse
                .<T>error("Conflict")
                .entity(HttpStatus.CONFLICT);
    }

    public static <T> ResponseEntity<APIResponse<T>> internalServerError() {
        return APIResponse.internalServerError("An unexpected error occurred");
    }

    public static <T> ResponseEntity<APIResponse<T>> internalServerError(String error) {
        return APIResponse
                .<T>error(error)
                .entity(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

}
