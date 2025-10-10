package com.example.quizapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.quizapp.dto.APIResponse;
import com.example.quizapp.dto.AppData;
import com.example.quizapp.dto.UserLoginInfo;
import com.example.quizapp.dto.UserRegistrationInfo;
import com.example.quizapp.entity.Quiz;
import com.example.quizapp.entity.User;
import com.example.quizapp.exception.QuizNotFoundException;
import com.example.quizapp.exception.UserNotFoundException;
import com.example.quizapp.middleware.Auth;
import com.example.quizapp.service.AuthService;
import com.example.quizapp.service.QuizService;
import com.example.quizapp.service.UserService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@RestController
public class Controller {

    private final AuthService authService;
    private final UserService userService;
    private final QuizService quizService;

    @Autowired
    public Controller(AuthService authService, UserService userService, QuizService quizService) {
        this.authService = authService;
        this.userService = userService;
        this.quizService = quizService;
    }

    @PostMapping("/api/register")
    public ResponseEntity<APIResponse<User>> handleRegister(@RequestBody UserRegistrationInfo userReg) {
        if (!userReg.isValid()) {
            return APIResponse.badRequest();
        }
        if (userService.usernameExists(userReg.getUsername())) {
            return APIResponse.conflict();
        }
        User createdUser = userService.registerUser(userReg);
        return APIResponse.ok(createdUser);
    }

    @PostMapping("/api/login")
    public ResponseEntity<APIResponse<User>> handleLogin(
            @RequestBody UserLoginInfo userLogin, HttpServletResponse response) {
        if (!userLogin.isValid()) {
            return APIResponse.badRequest();
        }
        try {
            User user = userService.getUserByUsernameAndPassword(
                    userLogin.getUsername(), userLogin.getPassword());
            authService.login(response, user);
            return APIResponse.ok(user);
        } catch (UserNotFoundException ex) {
            return APIResponse.badRequest();
        }
    }

    @RequestMapping("/api/logout")
    public ResponseEntity<APIResponse<String>> handleLogout(
            @RequestParam(value = "redirect_to_login", defaultValue = "false") String redirectParam,
            HttpServletResponse response) {
        authService.logout(response);
        boolean redirectToLogin = "true".equalsIgnoreCase(redirectParam);
        if (redirectToLogin) {
            return APIResponse.redirect("/login", response);
        }
        return APIResponse.ok("You have logged out");
    }

    @Auth
    @GetMapping("/api/app-data")
    public ResponseEntity<APIResponse<AppData>> handleGetAppData(HttpServletRequest request) {
        // TODO: figure out how to pass userId as arg so not calling .verify twice
        long userId = authService.verify(request).getUserId();
        try {
            // TODO: make these 2 fetches async
            User user = userService.getUserById(userId);
            List<Quiz> quizzes = quizService.getQuizzesByUserId(userId);
            AppData appData = new AppData(user.getId(), user.getUsername(), quizzes);
            return APIResponse.ok(appData);
        } catch (UserNotFoundException ex) {
            return APIResponse.badRequest();
        }
    }

    @Auth
    @PostMapping("/api/quizzes")
    public ResponseEntity<APIResponse<Quiz>> handleCreateQuiz(
            @RequestBody Quiz quiz, HttpServletRequest request) {
        long userId = authService.verify(request).getUserId();
        Quiz newQuiz = new Quiz(userId, quiz.getName(), quiz.getQuestions(), quiz.getResults());
        return APIResponse.ok(quizService.insertQuiz(newQuiz));
    }

    @Auth
    @GetMapping("/api/quizzes")
    public ResponseEntity<APIResponse<List<Quiz>>> handleGetQuizzes(HttpServletRequest request) {
        long userId = authService.verify(request).getUserId();
        return APIResponse.ok(quizService.getQuizzesByUserId(userId));
    }

    @GetMapping("/api/quizzes/{quizId}")
    public ResponseEntity<APIResponse<Quiz>> handleGetQuizById(
            @PathVariable("quizId") long quizId, HttpServletRequest request) {
        try {
            Quiz quiz = quizService.getQuizById(quizId);
            return APIResponse.ok(quiz);
        } catch (QuizNotFoundException ex) {
            return APIResponse.notFound();
        }
    }

    @Auth
    @PatchMapping("/api/quizzes/{quizId}")
    public ResponseEntity<APIResponse<Quiz>> handleUpdateQuizById(
            @PathVariable("quizId") long quizId, @RequestBody Quiz quiz, HttpServletRequest request) {
        long userId = authService.verify(request).getUserId();
        Quiz quizUpdate = new Quiz(quizId, userId, quiz.getName(), quiz.getQuestions(), quiz.getResults());
        try {
            return APIResponse.ok(quizService.updateQuiz(quizUpdate));
        } catch (QuizNotFoundException ex) {
            return APIResponse.notFound();
        }
    }

    @Auth
    @DeleteMapping("/api/quizzes/{quizId}")
    public ResponseEntity<APIResponse<Integer>> handleDeleteQuizById(
            @PathVariable("quizId") long quizId, HttpServletRequest request) {
        long userId = authService.verify(request).getUserId();
        int n = quizService.deleteQuizByIdAndUserId(quizId, userId);
        return APIResponse.ok(n);
    }

    @Auth
    @RequestMapping("/auth-check")
    public ResponseEntity<APIResponse<String>> handleAuthCheck() {
        return APIResponse.ok("You are authenticated");
    }

    @RequestMapping("/api/**")
    public ResponseEntity<APIResponse<String>> handleAPICatchAll() {
        return APIResponse.notFound("Route not found");
    }

}
