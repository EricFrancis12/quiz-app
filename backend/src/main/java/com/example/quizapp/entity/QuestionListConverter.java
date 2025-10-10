package com.example.quizapp.entity;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter
public class QuestionListConverter implements AttributeConverter<List<Question>, String> {

    private static final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public String convertToDatabaseColumn(List<Question> questionList) {
        if (questionList == null || questionList.isEmpty()) {
            return "[]";
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
            return new ArrayList<>();
        }
        try {
            return objectMapper.readValue(jsonString, new TypeReference<List<Question>>() {
            });
        } catch (JsonProcessingException ex) {
            throw new RuntimeException("Error converting JSON to question list", ex);
        }
    }
}
