package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.APIResponse;
import com.example.demo.dto.AppData;
import com.example.demo.dto.UserLoginInfo;
import com.example.demo.dto.UserRegistrationInfo;
import com.example.demo.entity.User;
import com.example.demo.exception.UserNotFoundException;
import com.example.demo.middleware.Auth;
import com.example.demo.service.AuthService;
import com.example.demo.service.UserService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@RestController
public class Controller {

    private final AuthService authService;
    private final UserService userService;

    @Autowired
    public Controller(AuthService authService, UserService userService) {
        this.authService = authService;
        this.userService = userService;
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
    public ResponseEntity<APIResponse<String>> handleLogout(HttpServletResponse response) {
        authService.logout(response);
        return APIResponse.ok("You have logged out");
    }

    @Auth
    @GetMapping("/api/app-data")
    public ResponseEntity<APIResponse<AppData>> handleGetAppData(HttpServletRequest request) {
        // TODO: figure out how to pass userId as arg so not calling .verify twice
        long userId = authService.verify(request).getUserId();
        try {
            User user = userService.getUserById(userId);
            AppData appData = new AppData(user.getId(), user.getUsername());
            return APIResponse.ok(appData);
        } catch (UserNotFoundException ex) {
            return APIResponse.badRequest();
        }
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
