package com.example.quizapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.quizapp.dto.UserRegistrationInfo;
import com.example.quizapp.entity.User;
import com.example.quizapp.exception.UserNotFoundException;
import com.example.quizapp.repository.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User registerUser(UserRegistrationInfo regInfo) {
        return userRepository.save(regInfo.toUser());
    }

    public User getUserById(long id) throws UserNotFoundException {
        return userRepository
                .findById(id)
                .orElseThrow(() -> UserNotFoundException.fromId(id));
    }

    public User getUserByUsername(String username) throws UserNotFoundException {
        return userRepository
                .findByUsername(username)
                .orElseThrow(() -> UserNotFoundException.fromUsername(username));
    }

    public User getUserByUsernameAndPassword(String username, String password) throws UserNotFoundException {
        User user = userRepository
                .findByUsername(username)
                .orElseThrow(() -> UserNotFoundException.fromUsername(username));
        if (!User.checkPassword(password, user.getHashedPassword())) {
            throw UserNotFoundException.fromUsername(username);
        }
        return user;
    }

    public boolean usernameExists(String username) {
        return !userRepository.findByUsername(username).isEmpty();
    }

}
