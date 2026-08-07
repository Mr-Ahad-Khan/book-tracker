import { useState, useEffect } from "react";

const EMPTY = {
  title: "",
  author: "",
  genre: "Fiction",
  status: "To Read",
  rating: 0,
  notes: "",
};

export default function BookForm({ book, onSubmit, onClose, genres, statuses }) {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (book) {
      setForm({
        title: book.title || "",
        author: book.author || "",
        genre: book.genre || "Fiction",
        status: book.status || "To Read",
        rating: book.rating ?? 0,
        notes: book.notes || "",
      });
    } else {
      setForm(EMPTY);
    }
  }, [book]);

  const handleChange = (field) => (e) => {
    const value = field === "rating" ? Number(e.target.value) : e.target.value;
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.title.trim()) errs.title = "Title is required";
    if (!form.author.trim()) errs.author = "Author is required";
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    onSubmit(form);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{book ? "Edit Book" : "Add a Book"}</h2>
          <button className="icon-btn" onClick={onClose}>
            ✕
          </button>
        </div>
        <form onSubmit={handleSubmit} className="form-body">
          <div className="field">
            <label>Title</label>
            <input
              type="text"
              value={form.title}
              onChange={handleChange("title")}
              placeholder="Book title"
            />
            {errors.title && <span className="field-error">{errors.title}</span>}
          </div>
          <div className="field">
            <label>Author</label>
            <input
              type="text"
              value={form.author}
              onChange={handleChange("author")}
              placeholder="Author name"
            />
            {errors.author && <span className="field-error">{errors.author}</span>}
          </div>
          <div className="field-row">
            <div className="field">
              <label>Genre</label>
              <select value={form.genre} onChange={handleChange("genre")}>
                {genres.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label>Status</label>
              <select value={form.status} onChange={handleChange("status")}>
                {statuses.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="field">
            <label>Rating</label>
            <div className="rating-picker">
              {[0, 1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  className={form.rating === n ? "active" : ""}
                  onClick={() => setForm({ ...form, rating: n })}
                >
                  {n === 0 ? "—" : `${n}★`}
                </button>
              ))}
            </div>
          </div>
          <div className="field">
            <label>Notes</label>
            <textarea
              value={form.notes}
              onChange={handleChange("notes")}
              placeholder="Your thoughts…"
              rows={3}
            />
          </div>
          <div className="form-actions">
            <button type="button" className="btn btn-ghost" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {book ? "Save Changes" : "Add Book"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
