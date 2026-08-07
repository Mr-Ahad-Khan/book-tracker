import { randomUUID } from "crypto";

const books = [
  {
    id: "seed-1",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "Fiction",
    status: "Read",
    rating: 5,
    notes: "A masterpiece of American literature.",
    createdAt: Date.now() - 50000,
  },
  {
    id: "seed-2",
    title: "Dune",
    author: "Frank Herbert",
    genre: "Sci-Fi",
    status: "Reading",
    rating: 4,
    notes: "Epic world-building.",
    createdAt: Date.now() - 40000,
  },
  {
    id: "seed-3",
    title: "Atomic Habits",
    author: "James Clear",
    genre: "Non-Fiction",
    status: "To Read",
    rating: 0,
    notes: "",
    createdAt: Date.now() - 30000,
  },
];

export function getAllBooks() {
  return [...books].sort((a, b) => b.createdAt - a.createdAt);
}

export function getBookById(id) {
  return books.find((b) => b.id === id);
}

export function createBook(data) {
  const book = {
    id: randomUUID(),
    title: data.title,
    author: data.author,
    genre: data.genre || "Fiction",
    status: data.status || "To Read",
    rating: data.rating ?? 0,
    notes: data.notes || "",
    createdAt: Date.now(),
  };
  books.push(book);
  return book;
}

export function updateBook(id, updates) {
  const book = books.find((b) => b.id === id);
  if (!book) return null;
  Object.assign(book, {
    title: updates.title ?? book.title,
    author: updates.author ?? book.author,
    genre: updates.genre ?? book.genre,
    status: updates.status ?? book.status,
    rating: updates.rating ?? book.rating,
    notes: updates.notes ?? book.notes,
  });
  return book;
}

export function deleteBook(id) {
  const idx = books.findIndex((b) => b.id === id);
  if (idx === -1) return false;
  books.splice(idx, 1);
  return true;
}

export const Book = { getAllBooks, getBookById, createBook, updateBook, deleteBook };
