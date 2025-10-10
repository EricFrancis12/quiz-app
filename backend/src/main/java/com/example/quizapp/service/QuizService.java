package com.example.quizapp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.quizapp.entity.Quiz;
import com.example.quizapp.exception.QuizNotFoundException;
import com.example.quizapp.repository.QuizRepository;

@Service
public class QuizService {

    private final QuizRepository quizRepository;

    @Autowired
    public QuizService(QuizRepository quizRepository) {
        this.quizRepository = quizRepository;
    }

    public Quiz insertQuiz(Quiz quiz) {
        // TODO: should we be using a creation type for inserting?
        return quizRepository.save(quiz);
    }

    public List<Quiz> getQuizzesByUserId(long userId) {
        return quizRepository.findByUserId(userId);
    }

    public Quiz getQuizById(long quizId) throws QuizNotFoundException {
        return quizRepository
                .findById(quizId)
                .orElseThrow(() -> QuizNotFoundException.fromId(quizId));
    }

    public Quiz getQuizByIdAndUserId(long quizId, long userId) throws QuizNotFoundException {
        return quizRepository
                .findByIdAndUserId(quizId, userId)
                .orElseThrow(() -> QuizNotFoundException.fromIdAndUserId(quizId, userId));
    }

    public Quiz updateQuiz(Quiz quiz) throws QuizNotFoundException {
        // Verify this quiz belongs to this user before calling .save()
        getQuizByIdAndUserId(quiz.getId(), quiz.getUser().getId());
        return quizRepository.save(quiz);
    }

    public int deleteQuizByIdAndUserId(long quizId, long userId) {
        return quizRepository.deleteByIdAndUserId(quizId, userId);
    }

}
