package com.example.demo.dto;

public class AppData {

    private final long userId;
    private final String username;

    public AppData(long userId, String username) {
        this.userId = userId;
        this.username = username;
    }

    public long getUserId() {
        return userId;
    }

    public String getUsername() {
        return username;
    }

}
