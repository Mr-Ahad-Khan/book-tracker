import { Router } from "express";
import { getAllBooks, getBookById, createBook, updateBook, deleteBook } from "../models/Book.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
  const { genre, status, search } = req.query;
  let books = await getAllBooks();

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
  } catch (error) { next(error); }
});

router.get("/:id", async (req, res, next) => {
  try {
  const book = await getBookById(req.params.id);
  if (!book) return res.status(404).json({ error: "Book not found" });
  res.json(book);
  } catch (error) { next(error); }
});

router.post("/", async (req, res, next) => {
  try {
  const { title, author, genre, status, rating, notes } = req.body;
  if (!title || !author) {
    return res.status(400).json({ error: "Title and author are required" });
  }
  const book = await createBook({
    title,
    author,
    genre: genre || "Fiction",
    status: status || "To Read",
    rating: rating ?? 0,
    notes: notes || "",
  });
  res.status(201).json(book);
  } catch (error) { next(error); }
});

router.put("/:id", async (req, res, next) => {
  try {
  const updated = await updateBook(req.params.id, req.body);
  if (!updated) return res.status(404).json({ error: "Book not found" });
  res.json(updated);
  } catch (error) { next(error); }
});

router.delete("/:id", async (req, res, next) => {
  try {
  const deleted = await deleteBook(req.params.id);
  if (!deleted) return res.status(404).json({ error: "Book not found" });
  res.json({ message: "Book deleted" });
  } catch (error) { next(error); }
});

export default router;
