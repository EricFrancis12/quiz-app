package com.example.demo.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "quizzes")
public class Quiz {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnore
    private User user;

    @Column(nullable = false, length = MAX_NAME_LENGTH)
    private String name;

    public static final int MAX_NAME_LENGTH = 64;

    public Quiz() {
    }

    public Quiz(long userId, String name) {
        this(null, userId, name);
    }

    public Quiz(Long id, long userId, String name) {
        this.id = id;
        this.user = new User(userId, null, null);
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    @JsonIgnore
    public User getUser() {
        return user;
    }

    public String getName() {
        return name;
    }

}
