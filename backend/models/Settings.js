import { pool } from "../db.js";

export async function getSettings() {
  await pool.query("INSERT IGNORE INTO settings (id, theme) VALUES (1, 'light')");
  const [rows] = await pool.query("SELECT theme FROM settings WHERE id = 1");
  return rows[0];
}

export async function updateSettings(updates) {
  await pool.execute("UPDATE settings SET theme = ? WHERE id = 1", [updates.theme]);
  return getSettings();
}
