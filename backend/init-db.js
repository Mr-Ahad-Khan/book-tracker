import { pool } from "./db.js";

async function initializeDatabase() {
  await pool.query(`
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
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS settings (
      id TINYINT PRIMARY KEY,
      theme ENUM('light', 'dark') NOT NULL DEFAULT 'light',
      CONSTRAINT chk_settings_single_row CHECK (id = 1)
    )
  `);

  await pool.query("INSERT IGNORE INTO settings (id, theme) VALUES (1, 'light')");
  console.log("Database schema initialized.");
}

initializeDatabase()
  .catch((error) => {
    console.error("Unable to initialize database:", error.message);
    process.exitCode = 1;
  })
  .finally(() => pool.end());
