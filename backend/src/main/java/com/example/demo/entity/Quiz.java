package com.example.demo.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.Converter;
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

    @Column(nullable = false, length = MAX_NAME_LENGTH)
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

class Question {

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

class QuestionChoice {

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

class QuizResult {

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

@Converter
class QuestionListConverter implements AttributeConverter<List<Question>, String> {

    private static final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public String convertToDatabaseColumn(List<Question> questionList) {
        if (questionList == null || questionList.isEmpty()) {
            return null;
        }
        try {
            return objectMapper.writeValueAsString(questionList);
        } catch (JsonProcessingException ex) {
            throw new RuntimeException("Error converting question list to JSON", ex);
        }
    }

    @Override
    public List<Question> convertToEntityAttribute(String jsonString) {
        if (jsonString == null || jsonString.trim().isEmpty()) {
            return null;
        }
        try {
            return objectMapper.readValue(jsonString, new TypeReference<List<Question>>() {
            });
        } catch (JsonProcessingException ex) {
            throw new RuntimeException("Error converting JSON to question list", ex);
        }
    }
}

@Converter
class QuizResultListConverter implements AttributeConverter<List<QuizResult>, String> {

    private static final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public String convertToDatabaseColumn(List<QuizResult> resultList) {
        if (resultList == null || resultList.isEmpty()) {
            return null;
        }
        try {
            return objectMapper.writeValueAsString(resultList);
        } catch (JsonProcessingException ex) {
            throw new RuntimeException("Error converting quiz result list to JSON", ex);
        }
    }

    @Override
    public List<QuizResult> convertToEntityAttribute(String jsonString) {
        if (jsonString == null || jsonString.trim().isEmpty()) {
            return null;
        }
        try {
            return objectMapper.readValue(jsonString, new TypeReference<List<QuizResult>>() {
            });
        } catch (JsonProcessingException ex) {
            throw new RuntimeException("Error converting JSON to quiz result list", ex);
        }
    }
}
