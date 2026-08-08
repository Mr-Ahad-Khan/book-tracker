import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { app, verifyConnection } from "./app.js";

const PORT = Number(process.env.PORT || 3000);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const frontendDist = path.resolve(__dirname, "../frontend/dist");

app.use(express.static(frontendDist));
app.get("*", (req, res, next) => {
  if (req.path.startsWith("/api/")) return next();
  res.sendFile(path.join(frontendDist, "index.html"));
});

async function start() {
  await verifyConnection();
  app.listen(PORT, () => console.log(`Book Tracker running on port ${PORT}`));
}

start().catch((error) => {
  console.error("Unable to connect to MySQL:", error.message);
  process.exit(1);
});
