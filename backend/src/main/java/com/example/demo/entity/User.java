package com.example.demo.entity;

import com.example.demo.util.HashingUtil;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false, length = MAX_USERNAME_LENGTH)
    private String username;

    @Column(nullable = false, length = MAX_PASSWORD_LENGTH)
    private String hashedPassword;

    public static final int MAX_USERNAME_LENGTH = 64;
    public static final int MIN_PASSWORD_LENGTH = 8;
    public static final int MAX_PASSWORD_LENGTH = 64;

    public User() {
    }

    public User(String username, String password) {
        this(null, username, password);
    }

    public User(Long id, String username, String password) {
        this.id = id;
        this.username = username;
        if (password != null) {
            this.hashedPassword = hashPassword(password);
        }
    }

    // TODO: should we have a HashedPassword class?
    public static String hashPassword(String password) {
        // TODO: refactor to use bcrypt
        return HashingUtil.hashSHA256(password);
    }

    public Long getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public String getHashedPassword() {
        return hashedPassword;
    }

}
