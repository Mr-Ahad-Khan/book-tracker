import { Router } from "express";
import { Book, getAllBooks, getBookById, createBook, updateBook, deleteBook } from "../models/Book.js";

const router = Router();

router.get("/", (req, res) => {
  const { genre, status, search } = req.query;
  let books = getAllBooks();

  if (genre && genre !== "All") {
    books = books.filter((b) => b.genre === genre);
  }
  if (status && status !== "All") {
    books = books.filter((b) => b.status === status);
  }
  if (search) {
    const q = search.toLowerCase();
    books = books.filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q)
    );
  }

  res.json(books);
});

router.get("/:id", (req, res) => {
  const book = getBookById(req.params.id);
  if (!book) return res.status(404).json({ error: "Book not found" });
  res.json(book);
});

router.post("/", (req, res) => {
  const { title, author, genre, status, rating, notes } = req.body;
  if (!title || !author) {
    return res.status(400).json({ error: "Title and author are required" });
  }
  const book = createBook({
    title,
    author,
    genre: genre || "Fiction",
    status: status || "To Read",
    rating: rating ?? 0,
    notes: notes || "",
  });
  res.status(201).json(book);
});

router.put("/:id", (req, res) => {
  const updated = updateBook(req.params.id, req.body);
  if (!updated) return res.status(404).json({ error: "Book not found" });
  res.json(updated);
});

router.delete("/:id", (req, res) => {
  const deleted = deleteBook(req.params.id);
  if (!deleted) return res.status(404).json({ error: "Book not found" });
  res.json({ message: "Book deleted" });
});

export default router;
