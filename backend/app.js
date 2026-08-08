import express from "express";
import cors from "cors";
import booksRouter from "./routes/books.js";
import settingsRouter from "./routes/settings.js";
import { verifyDatabaseConnection } from "./db.js";

export const app = express();

app.use(cors());
app.use(express.json());

app.get(["/api/health", "/health"], (req, res) => {
  res.json({ status: "ok" });
});

app.use(["/api/books", "/books"], booksRouter);
app.use(["/api/settings", "/settings"], settingsRouter);

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ error: "An unexpected server error occurred" });
});

export const verifyConnection = verifyDatabaseConnection;
