package com.example.demo.exception;

public class QuizNotFoundException extends ResourceNotFoundException {

    public QuizNotFoundException(String message) {
        super(message);
    }

    public static QuizNotFoundException fromId(long quizId) {
        return new QuizNotFoundException(String.format(
                "Quiz not found with ID (%d)", quizId));
    }

    public static QuizNotFoundException fromIdAndUserId(long quizId, long userId) {
        return new QuizNotFoundException(String.format(
                "Quiz not found with ID (%d) and user ID (%d)", quizId, userId));
    }

}
