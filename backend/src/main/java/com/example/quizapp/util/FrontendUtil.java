package com.example.quizapp.util;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

public class FrontendUtil {

    private static final String FRONTEND_HTML_PATH = "../frontend/dist/index.html";
    private static final String FRONTEND_HTML = initFrontendHTML();

    private static String initFrontendHTML() {
        try {
            Path filePath = Paths.get(FRONTEND_HTML_PATH);
            if (Files.exists(filePath)) {
                return Files.readString(filePath);
            } else {
                System.err.printf("Frontend index.html file does not exist at '%s'\n", FRONTEND_HTML_PATH);
            }
        } catch (IOException ex) {
            System.err.println("Failed to load index.html: " + ex.getMessage());
        }
        return "<html><body><h1>Error loading frontend</h1></body></html>";
    }

    public static String getFrontendHTML() {
        return FRONTEND_HTML;
    }

    public static ResponseEntity<String> serveFrontend() {
        return ResponseEntity.ok()
                .contentType(MediaType.TEXT_HTML)
                .body(FRONTEND_HTML);
    }

}
