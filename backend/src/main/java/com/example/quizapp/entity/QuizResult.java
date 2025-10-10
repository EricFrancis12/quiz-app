package com.example.quizapp.entity;

public class QuizResult {

    private String name;
    private String description;

    public QuizResult() {
    }

    public QuizResult(String name, String description) {
        this.name = name;
        this.description = description;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

}
