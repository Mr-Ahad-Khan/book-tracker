CREATE DATABASE IF NOT EXISTS book_tracker
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE book_tracker;

CREATE TABLE IF NOT EXISTS books (
  id CHAR(36) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  genre VARCHAR(100) NOT NULL DEFAULT 'Fiction',
  status ENUM('To Read', 'Reading', 'Read') NOT NULL DEFAULT 'To Read',
  rating TINYINT UNSIGNED NOT NULL DEFAULT 0,
  notes TEXT NOT NULL,
  created_at BIGINT NOT NULL,
  INDEX idx_books_created_at (created_at),
  INDEX idx_books_genre (genre),
  INDEX idx_books_status (status)
);

CREATE TABLE IF NOT EXISTS settings (
  id TINYINT PRIMARY KEY,
  theme ENUM('light', 'dark') NOT NULL DEFAULT 'light',
  CONSTRAINT chk_settings_single_row CHECK (id = 1)
);

INSERT IGNORE INTO settings (id, theme) VALUES (1, 'light');
