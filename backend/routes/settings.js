import { Router } from "express";
import { getSettings, updateSettings } from "../models/Settings.js";

const router = Router();
const THEMES = new Set(["light", "dark"]);

router.get("/", async (req, res, next) => {
  try { res.json(await getSettings()); } catch (error) { next(error); }
});

router.put("/", async (req, res, next) => {
  try {
  const { theme } = req.body;

  if (!THEMES.has(theme)) {
    return res.status(400).json({ error: "Theme must be either light or dark" });
  }

  res.json(await updateSettings({ theme }));
  } catch (error) { next(error); }
});

export default router;
