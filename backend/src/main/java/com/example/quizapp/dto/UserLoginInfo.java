package com.example.quizapp.dto;

public class UserLoginInfo extends UserInfo {

    @Override
    public boolean isValid() {
        return username != null
                && !username.isEmpty()
                && password != null
                && !password.isEmpty();
    }

}
