package com.example.demo.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.Quiz;

import jakarta.transaction.Transactional;

@Repository
public interface QuizRepository extends JpaRepository<Quiz, Long> {

    @Query("FROM Quiz q WHERE q.user.id = :userId")
    List<Quiz> findByUserId(@Param("userId") Long userId);

    @Query("FROM Quiz q WHERE q.id = :quizId AND q.user.id = :userId")
    Optional<Quiz> findByIdAndUserId(@Param("quizId") Long quizId, @Param("userId") Long userId);

    @Modifying
    @Transactional
    @Query("DELETE FROM Quiz q WHERE q.id = :quizId AND q.user.id = :userId")
    int deleteByIdAndUserId(@Param("quizId") Long quizId, @Param("userId") Long userId);

}
