package com.example.demo.dto;

import java.util.List;

import com.example.demo.entity.Quiz;

public class AppData {

    private final long userId;
    private final String username;
    private final List<Quiz> quizzes;

    public AppData(long userId, String username, List<Quiz> quizzes) {
        this.userId = userId;
        this.username = username;
        this.quizzes = quizzes;
    }

    public long getUserId() {
        return userId;
    }

    public String getUsername() {
        return username;
    }

    public List<Quiz> getQuizzes() {
        return quizzes;
    }

}
