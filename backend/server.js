import express from "express";
import cors from "cors";
import booksRouter from "./routes/books.js";
import settingsRouter from "./routes/settings.js";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/books", booksRouter);
app.use("/api/settings", settingsRouter);

app.listen(PORT, () => {
  console.log(`Backend API running on http://localhost:${PORT}`);
});
