import { Router } from "express";
import { getSettings, updateSettings } from "../models/Settings.js";

const router = Router();
const THEMES = new Set(["light", "dark"]);

router.get("/", (req, res) => {
  res.json(getSettings());
});

router.put("/", (req, res) => {
  const { theme } = req.body;

  if (!THEMES.has(theme)) {
    return res.status(400).json({ error: "Theme must be either light or dark" });
  }

  res.json(updateSettings({ theme }));
});

export default router;
