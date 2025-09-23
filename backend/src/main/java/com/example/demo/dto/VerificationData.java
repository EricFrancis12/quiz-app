package com.example.demo.dto;

public class VerificationData {

    private final long userId;

    public VerificationData(long userId) {
        this.userId = userId;
    }

    public long getUserId() {
        return userId;
    }

}
