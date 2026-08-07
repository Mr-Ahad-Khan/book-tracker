const STATUS_COLORS = {
  "To Read": "toread",
  Reading: "reading",
  Read: "read",
};

function Stars({ rating }) {
  return (
    <div className="stars" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <span key={n} className={n <= rating ? "star filled" : "star"}>
          ★
        </span>
      ))}
    </div>
  );
}

export default function BookList({ books, onEdit, onDelete, onStatusChange }) {
  if (books.length === 0) {
    return (
      <div className="empty-state">
        <span className="empty-icon" aria-hidden="true">📚</span>
        <h3>No books found</h3>
        <p>Add a book or adjust your filters to see your collection.</p>
      </div>
    );
  }

  return (
    <div className="book-grid">
      {books.map((book) => (
        <article key={book.id} className="book-card">
          <div className="book-card-top">
            <span className={`badge badge-${STATUS_COLORS[book.status]}`}>
              {book.status}
            </span>
            <div className="card-actions">
              <button className="icon-btn" onClick={() => onEdit(book)} title="Edit">
                ✏️
              </button>
              <button
                className="icon-btn"
                onClick={() => onDelete(book.id)}
                title="Delete"
              >
                🗑️
              </button>
            </div>
          </div>
          <h3 className="book-title">{book.title}</h3>
          <p className="book-author">by {book.author}</p>
          <span className="book-genre">{book.genre}</span>
          <Stars rating={book.rating} />
          {book.notes && <p className="book-notes">{book.notes}</p>}
          <div className="status-switcher">
            {["To Read", "Reading", "Read"].map((s) => (
              <button
                key={s}
                className={`status-chip ${book.status === s ? "active" : ""}`}
                onClick={() => onStatusChange(book.id, s)}
              >
                {s}
              </button>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}
