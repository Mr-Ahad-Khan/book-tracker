import { pool } from "../db.js";

const BOOK_COLUMNS = `
  id, title, author, genre, status, rating, notes, created_at AS createdAt
`;

export async function getAllBooks() {
  const [books] = await pool.query(
    `SELECT ${BOOK_COLUMNS} FROM books ORDER BY created_at DESC`
  );
  return books;
}

export async function getBookById(id) {
  const [books] = await pool.execute(
    `SELECT ${BOOK_COLUMNS} FROM books WHERE id = ?`,
    [id]
  );
  return books[0] ?? null;
}

export async function createBook(data) {
  const book = {
    id: crypto.randomUUID(),
    title: data.title,
    author: data.author,
    genre: data.genre || "Fiction",
    status: data.status || "To Read",
    rating: data.rating ?? 0,
    notes: data.notes || "",
    createdAt: Date.now(),
  };

  await pool.execute(
    `INSERT INTO books (id, title, author, genre, status, rating, notes, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [book.id, book.title, book.author, book.genre, book.status, book.rating, book.notes, book.createdAt]
  );
  return book;
}

export async function updateBook(id, updates) {
  const fields = ["title", "author", "genre", "status", "rating", "notes"];
  const changed = fields.filter((field) => updates[field] !== undefined);
  if (changed.length) {
    await pool.execute(
      `UPDATE books SET ${changed.map((field) => `${field} = ?`).join(", ")} WHERE id = ?`,
      [...changed.map((field) => updates[field]), id]
    );
  }
  return getBookById(id);
}

export async function deleteBook(id) {
  const [result] = await pool.execute("DELETE FROM books WHERE id = ?", [id]);
  return result.affectedRows > 0;
}
