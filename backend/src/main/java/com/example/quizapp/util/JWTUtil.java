package com.example.quizapp.util;

import java.util.Date;

import org.springframework.beans.factory.annotation.Value;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;

public class JWTUtil {

    @Value("${spring.application.name}")
    private static String SUBJECT;

    public static String generateToken(String key, long value, int durationSecs, String secretKey) {
        return generateToken(key, String.valueOf(value), durationSecs, secretKey);
    }

    public static String generateToken(String key, String value, int durationSecs, String secretKey) {
        long nowMillis = System.currentTimeMillis();
        long expMillis = nowMillis + (long) durationSecs * 1000;
        return Jwts.builder()
                .setSubject(SUBJECT)
                .claim(key, value)
                .setIssuedAt(new Date(nowMillis))
                .setExpiration(new Date(expMillis))
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }

    public static Claims parseToken(String token, String secretKey)
            throws UnsupportedJwtException, MalformedJwtException,
            SignatureException, ExpiredJwtException, IllegalArgumentException {
        return Jwts.parser()
                .setSigningKey(secretKey)
                .parseClaimsJws(token)
                .getBody();
    }

    public static Claims safeParseToken(String token, String secretKey) {
        try {
            return parseToken(token, secretKey);
        } catch (UnsupportedJwtException
                | MalformedJwtException
                | SignatureException
                | ExpiredJwtException
                | IllegalArgumentException ex) {
            return null;
        }
    }

}
