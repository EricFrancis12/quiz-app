package com.example.quizapp.entity;

public class QuestionChoice {

    private String text;
    private int points;
    private int resultIndex;

    public QuestionChoice() {
    }

    public QuestionChoice(String text, int points, int resultIndex) {
        this.text = text;
        this.points = points;
        this.resultIndex = resultIndex;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public int getPoints() {
        return points;
    }

    public void setPoints(int points) {
        this.points = points;
    }

    public int getResultIndex() {
        return resultIndex;
    }

    public void setResultIndex(int resultIndex) {
        this.resultIndex = resultIndex;
    }

}
