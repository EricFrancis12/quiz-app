package com.example.demo.dto;

import com.example.demo.entity.User;

public abstract class UserInfo {

    protected String username;
    protected String password;

    // TODO: create validate() that throws errors to incidate
    // what is wrong with each field
    public abstract boolean isValid();

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public User toUser() {
        return new User(username, password);
    }

}
