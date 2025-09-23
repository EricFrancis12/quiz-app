package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dto.UserRegistrationInfo;
import com.example.demo.entity.User;
import com.example.demo.exception.UserNotFoundException;
import com.example.demo.repository.UserRepository;

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
        String hashedPassword = User.hashPassword(password);
        return userRepository
                .findByUsernameAndHashedPassword(username, hashedPassword)
                .orElseThrow(() -> UserNotFoundException.fromUsernameAndHashedPassword(username, hashedPassword));
    }

    public boolean usernameExists(String username) {
        return !userRepository.findByUsername(username).isEmpty();
    }

}
