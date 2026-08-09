import serverless from "serverless-http";
import { app, verifyConnection } from "../../app.js";

let databaseReady;

async function ensureDatabaseConnection() {
  if (!databaseReady) databaseReady = verifyConnection();
  return databaseReady;
}

const serverlessHandler = serverless(app);

export async function handler(event, context) {
  try {
    await ensureDatabaseConnection();
    return await serverlessHandler(event, context);
  } catch (error) {
    console.error("Database connection failed:", error);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Database configuration or connection failed" }),
    };
  }
}
