package com.example.quizapp.service;

import org.springframework.stereotype.Service;

import com.example.quizapp.dto.VerificationData;
import com.example.quizapp.entity.User;
import com.example.quizapp.exception.UnauthorizedException;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Service
public interface AuthService {
    void login(HttpServletResponse response, User user);

    void logout(HttpServletResponse response);

    VerificationData verify(HttpServletRequest request) throws UnauthorizedException;
}
