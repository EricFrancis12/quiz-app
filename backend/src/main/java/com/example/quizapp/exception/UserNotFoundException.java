package com.example.quizapp.exception;

public class UserNotFoundException extends ResourceNotFoundException {

    public UserNotFoundException(String message) {
        super(message);
    }

    public static UserNotFoundException fromId(long userId) {
        return new UserNotFoundException(String.format("User not found with ID (%d)", userId));
    }

    public static UserNotFoundException fromUsername(String username) {
        return new UserNotFoundException(String.format("User not found with username (%s)", username));
    }

    public static UserNotFoundException fromUsernameAndHashedPassword(String username, String hashedPassword) {
        return new UserNotFoundException(String.format(
                "User not found with username (%s) and hashed password (%s)",
                username, hashedPassword));
    }

}
