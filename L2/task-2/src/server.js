import app from "./app.js";
import { env } from "./config/env.js";
import { prisma } from "./config/database.js";

const SHUTDOWN_TIMEOUT_MS = 10_000;

let server;
let isShuttingDown = false;

const startServer = async () => {
  try {
    await prisma.$connect();

    server = app.listen(env.port, () => {
      console.log(`Server running at http://localhost:${env.port}`);
    });
  } catch (error) {
    console.error("Failed to connect to database:", error);
    process.exit(1);
  }
};

const shutdown = async (signal) => {
  if (isShuttingDown) {
    console.warn(`Received ${signal} again, forcing exit.`);
    process.exit(1);
  }

  isShuttingDown = true;
  console.log(`\nReceived ${signal}, starting graceful shutdown...`);

  const forceExitTimer = setTimeout(() => {
    console.error(
      `Graceful shutdown timed out after ${SHUTDOWN_TIMEOUT_MS}ms, forcing exit.`,
    );
    process.exit(1);
  }, SHUTDOWN_TIMEOUT_MS);
  forceExitTimer.unref();

  try {
    if (server) {
      await new Promise((resolve, reject) => {
        server.close((err) => (err ? reject(err) : resolve()));
      });
      console.log("HTTP server closed.");
    }

    await prisma.$disconnect();
    console.log("Database connection closed.");

    clearTimeout(forceExitTimer);
    console.log("Graceful shutdown complete.");
    process.exit(0);
  } catch (error) {
    console.error("Error during graceful shutdown:", error);
    clearTimeout(forceExitTimer);
    process.exit(1);
  }
};

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));

process.on("unhandledRejection", (reason) => {
  console.error("Unhandled Rejection:", reason);
  shutdown("unhandledRejection");
});

process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  shutdown("uncaughtException");
});

startServer();
