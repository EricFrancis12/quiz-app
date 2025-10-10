package com.example.quizapp.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "quizzes")
public class Quiz {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnore
    private User user;

    @Column(length = MAX_NAME_LENGTH)
    private String name;

    @Column(columnDefinition = "TEXT")
    @Convert(converter = QuestionListConverter.class)
    private List<Question> questions;

    @Column(columnDefinition = "TEXT")
    @Convert(converter = QuizResultListConverter.class)
    private List<QuizResult> results;

    public static final int MAX_NAME_LENGTH = 64;

    public Quiz() {
    }

    public Quiz(long userId, String name, List<Question> questions, List<QuizResult> results) {
        this(null, userId, name, questions, results);
    }

    public Quiz(Long id, long userId, String name, List<Question> questions, List<QuizResult> results) {
        this.id = id;
        this.user = new User(userId, null, null);
        this.name = name;
        this.questions = questions;
        this.results = results;
    }

    public Long getId() {
        return id;
    }

    @JsonIgnore
    public User getUser() {
        return user;
    }

    public String getName() {
        return name;
    }

    public List<Question> getQuestions() {
        return questions;
    }

    public List<QuizResult> getResults() {
        return results;
    }

}
