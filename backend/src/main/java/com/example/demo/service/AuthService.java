package com.example.demo.service;

import org.springframework.stereotype.Service;

import com.example.demo.dto.VerificationData;
import com.example.demo.entity.User;
import com.example.demo.exception.UnauthorizedException;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Service
public interface AuthService {
    void login(HttpServletResponse response, User user);

    void logout(HttpServletResponse response);

    VerificationData verify(HttpServletRequest request) throws UnauthorizedException;
}
