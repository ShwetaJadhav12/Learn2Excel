CREATE DATABASE IF NOT EXISTS quizDB;

USE quizDB;

CREATE TABLE IF NOT EXISTS quiz_progress (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId VARCHAR(50) NOT NULL,
    currentQuestionIndex INT NOT NULL,
    selectedAnswers JSON NOT NULL,
    UNIQUE KEY unique_user (userId)
);