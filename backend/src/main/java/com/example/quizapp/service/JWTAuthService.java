package com.example.quizapp.service;

import org.springframework.stereotype.Service;

import com.example.quizapp.util.JWTUtil;
import com.example.quizapp.dto.VerificationData;
import com.example.quizapp.entity.User;
import com.example.quizapp.exception.MissingEnvironmentVariableException;
import com.example.quizapp.exception.UnauthorizedException;
import com.example.quizapp.util.CookieUtil;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.RequiredTypeException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Service
public class JWTAuthService implements AuthService {

    private static final int LOGIN_DURATION_SECS = 7 * 24 * 60 * 60;
    private static final String SECRET_KEY = getSecretKey();

    private static String getSecretKey() {
        final String name = "AUTH_SECRET_KEY";
        String key = System.getenv(name);
        if (key == null || key.trim().isEmpty()) {
            throw new MissingEnvironmentVariableException(name);
        }
        return key;
    }

    @Override
    public void login(HttpServletResponse response, User user) {
        String token = JWTUtil.generateToken("userId", user.getId(), LOGIN_DURATION_SECS, SECRET_KEY);
        CookieUtil.setCookie(response, "jwt", token, LOGIN_DURATION_SECS);
    }

    @Override
    public void logout(HttpServletResponse response) {
        CookieUtil.clearCookie(response, "jwt");
    }

    @Override
    public VerificationData verify(HttpServletRequest request) throws UnauthorizedException {
        Cookie jwtCookie = CookieUtil.getCookie(request, "jwt");
        if (jwtCookie == null) {
            throw new UnauthorizedException("JWT cookie not found");
        }

        String jwtToken = jwtCookie.getValue();
        if (jwtToken == null || jwtToken.isEmpty()) {
            throw new UnauthorizedException("JWT token is empty");
        }

        Claims claims = JWTUtil.safeParseToken(jwtToken, SECRET_KEY);
        if (claims == null) {
            throw new UnauthorizedException("Unable to parse JWT claims");
        }

        String userIdString;
        try {
            userIdString = claims.get("userId", String.class);
            if (userIdString == null || userIdString.isBlank()) {
                throw new UnauthorizedException("JWT userId field is missing or empty");
            }
        } catch (RequiredTypeException ex) {
            throw new UnauthorizedException("Unknown JWT data type");
        }

        try {
            long userId = Long.parseLong(userIdString);
            return new VerificationData(userId);
        } catch (NumberFormatException ex) {
            throw new UnauthorizedException("JWT userId could not be converted to a Long");
        }
    }

}
