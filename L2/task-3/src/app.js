import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cors from "cors";
import { env } from "./config/env.js";
import productRoutes from "./routes/product.route.js";
import categoryRoutes from "./routes/category.route.js";
import { errorHandler } from "./middlewares/error.middleware.js";

const app = express();

app.set("trust proxy", 1);
app.use(cors({ origin: env.frontendUrl, credentials: true }));
app.use(helmet());
app.use(express.json({ limit: "100kb" }));

const writeLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests, please try again later",
  },
});

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Products API is running",
  });
});

app.use("/api/products", writeLimiter, productRoutes);
app.use("/api/categories", writeLimiter, categoryRoutes);

app.use((req, res, next) => {
  const error = new Error("Route not found");

  error.statusCode = 404;

  next(error);
});

app.use(errorHandler);

export default app;
