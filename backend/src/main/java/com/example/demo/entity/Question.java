package com.example.demo.entity;

import java.util.List;

public class Question {

    private String text;
    private List<QuestionChoice> choices;

    public Question() {
    }

    public Question(String text, List<QuestionChoice> choices) {
        this.text = text;
        this.choices = choices;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public List<QuestionChoice> getChoices() {
        return choices;
    }

    public void setChoices(List<QuestionChoice> choices) {
        this.choices = choices;
    }

}
