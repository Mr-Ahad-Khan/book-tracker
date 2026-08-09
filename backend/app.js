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

// Handles ES module default export wrappers in Netlify serverless builds
const books = booksRouter.default || booksRouter;
const settings = settingsRouter.default || settingsRouter;

app.use(["/api/books", "/books"], books);
app.use(["/api/settings", "/settings"], settings);

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ error: "An unexpected server error occurred" });
});

export const verifyConnection = verifyDatabaseConnection;
