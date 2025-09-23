package com.example.demo.dto;

import com.example.demo.entity.User;

public class UserRegistrationInfo extends UserInfo {

    @Override
    public boolean isValid() {
        return username != null
                && !username.isEmpty()
                && username.length() <= User.MAX_USERNAME_LENGTH
                && password != null
                && password.length() >= User.MIN_PASSWORD_LENGTH
                && password.length() <= User.MAX_PASSWORD_LENGTH;
    }
}
