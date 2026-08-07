import { useState, useEffect, useCallback } from "react";
import { fetchBooks, createBook, updateBook, deleteBook } from "./api.js";
import BookList from "./components/BookList.jsx";
import BookForm from "./components/BookForm.jsx";
import FilterBar from "./components/FilterBar.jsx";

const GENRES = ["All", "Fiction", "Sci-Fi", "Non-Fiction", "Fantasy", "Mystery", "Biography"];
const STATUSES = ["All", "To Read", "Reading", "Read"];

export default function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState({ genre: "All", status: "All", search: "" });
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const loadBooks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchBooks({
        genre: filter.genre,
        status: filter.status,
        search: filter.search,
      });
      setBooks(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    loadBooks();
  }, [loadBooks]);

  const handleSubmit = async (formData) => {
    try {
      if (editing) {
        await updateBook(editing.id, formData);
      } else {
        await createBook(formData);
      }
      setFormOpen(false);
      setEditing(null);
      await loadBooks();
    } catch (e) {
      setError(e.message);
    }
  };

  const handleEdit = (book) => {
    setEditing(book);
    setFormOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteBook(id);
      await loadBooks();
    } catch (e) {
      setError(e.message);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await updateBook(id, { status });
      await loadBooks();
    } catch (e) {
      setError(e.message);
    }
  };

  const openNew = () => {
    setEditing(null);
    setFormOpen(true);
  };

  const stats = {
    total: books.length,
    read: books.filter((b) => b.status === "Read").length,
    reading: books.filter((b) => b.status === "Reading").length,
    toRead: books.filter((b) => b.status === "To Read").length,
  };

  return (
    <div className="app">
      <header className="header">
        <div className="header-inner">
          <div className="brand">
            <span className="brand-icon" aria-hidden="true">📖</span>
            <div>
              <h1>Book Tracker</h1>
              <p className="tagline">Your personal reading journey</p>
            </div>
          </div>
          <button className="btn btn-primary" onClick={openNew}>
            + Add Book
          </button>
        </div>
      </header>

      <main className="container">
        <div className="stats-row">
          <div className="stat-card">
            <span className="stat-num">{stats.total}</span>
            <span className="stat-label">Total</span>
          </div>
          <div className="stat-card stat-read">
            <span className="stat-num">{stats.read}</span>
            <span className="stat-label">Read</span>
          </div>
          <div className="stat-card stat-reading">
            <span className="stat-num">{stats.reading}</span>
            <span className="stat-label">Reading</span>
          </div>
          <div className="stat-card stat-toread">
            <span className="stat-num">{stats.toRead}</span>
            <span className="stat-label">To Read</span>
          </div>
        </div>

        <FilterBar
          filter={filter}
          setFilter={setFilter}
          genres={GENRES}
          statuses={STATUSES}
        />

        {error && <div className="error-banner">{error}</div>}

        {loading ? (
          <div className="loading">Loading your library…</div>
        ) : (
          <BookList
            books={books}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onStatusChange={handleStatusChange}
          />
        )}
      </main>

      {formOpen && (
        <BookForm
          book={editing}
          onSubmit={handleSubmit}
          onClose={() => {
            setFormOpen(false);
            setEditing(null);
          }}
          genres={GENRES.filter((g) => g !== "All")}
          statuses={STATUSES.filter((s) => s !== "All")}
        />
      )}
    </div>
  );
}
