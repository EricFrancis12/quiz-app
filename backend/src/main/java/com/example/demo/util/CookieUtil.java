package com.example.demo.util;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class CookieUtil {

    public static final int DEFAULT_COOKIE_DURATION_SECS = 7 * 24 * 60 * 60;

    public static Cookie getCookie(HttpServletRequest request, String key) {
        Cookie[] cookies = request.getCookies();
        if (cookies == null) {
            return null;
        }
        for (Cookie cookie : cookies) {
            if (cookie.getName().equals(key)) {
                return cookie;
            }
        }
        return null;
    }

    public static void setCookie(HttpServletResponse response, String key, String value) {
        setCookie(response, key, value, DEFAULT_COOKIE_DURATION_SECS);
    }

    public static void setCookie(HttpServletResponse response, String key, String value, int durationSecs) {
        Cookie cookie = new Cookie(key, value);
        cookie.setHttpOnly(true);
        cookie.setMaxAge(durationSecs);
        cookie.setPath("/");
        response.addCookie(cookie);
    }

    public static void clearCookie(HttpServletResponse response, String key) {
        setCookie(response, key, "", 0);
    }

}
