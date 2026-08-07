const BASE = "/api/books";
const SETTINGS_BASE = "/api/settings";

export async function fetchSettings() {
  const res = await fetch(SETTINGS_BASE);
  if (!res.ok) throw new Error("Failed to load settings");
  return res.json();
}

export async function updateSettings(settings) {
  const res = await fetch(SETTINGS_BASE, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(settings),
  });
  if (!res.ok) throw new Error("Failed to save settings");
  return res.json();
}

export async function fetchBooks(params = {}) {
  const qs = new URLSearchParams(params).toString();
  const res = await fetch(`${BASE}${qs ? "?" + qs : ""}`);
  if (!res.ok) throw new Error("Failed to fetch books");
  return res.json();
}

export async function createBook(book) {
  const res = await fetch(BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(book),
  });
  if (!res.ok) throw new Error("Failed to create book");
  return res.json();
}

export async function updateBook(id, updates) {
  const res = await fetch(`${BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  if (!res.ok) throw new Error("Failed to update book");
  return res.json();
}

export async function deleteBook(id) {
  const res = await fetch(`${BASE}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete book");
  return res.json();
}
