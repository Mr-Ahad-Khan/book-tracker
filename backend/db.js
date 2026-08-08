import "dotenv/config";
import mysql from "mysql2/promise";

const required = ["DB_HOST", "DB_USER", "DB_NAME"];
const missing = required.filter((name) => !process.env[name]);

if (missing.length) {
  throw new Error(`Missing required database environment variables: ${missing.join(", ")}`);
}

export const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME,
  ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : undefined,
  waitForConnections: true,
  connectionLimit: Number(process.env.DB_CONNECTION_LIMIT || 10),
});

export async function verifyDatabaseConnection() {
  await pool.query("SELECT 1");
}
