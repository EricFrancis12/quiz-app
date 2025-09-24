package com.example.demo.entity;

import java.util.List;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter
public class QuizResultListConverter implements AttributeConverter<List<QuizResult>, String> {

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
