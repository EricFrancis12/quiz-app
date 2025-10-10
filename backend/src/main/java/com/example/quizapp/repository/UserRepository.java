package com.example.quizapp.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.quizapp.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    @Query("FROM User a WHERE a.username = :username")
    Optional<User> findByUsername(@Param("username") String username);

    @Query("FROM User a WHERE a.username = :username AND a.hashedPassword = :hashedPassword")
    Optional<User> findByUsernameAndHashedPassword(
            @Param("username") String username,
            @Param("hashedPassword") String hashedPassword);

}
