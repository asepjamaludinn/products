import express from "express";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import cors from "cors";
import { env } from "./config/env.js";
import productRoutes from "./routes/product.route.js";
import categoryRoutes from "./routes/category.route.js";
import notificationRoutes from "./routes/notification.route.js";
import messageRoutes from "./routes/message.route.js";
import authRoutes from "./routes/auth.route.js";
import { errorHandler } from "./middlewares/error.middleware.js";

const app = express();

app.set("trust proxy", 1);

const corsOptions = {
  origin: env.frontendUrl.includes(",")
    ? env.frontendUrl.split(",")
    : env.frontendUrl,
  credentials: true,
};
app.use(cors(corsOptions));

app.use(helmet());
app.use(express.json({ limit: "100kb" }));
app.use(cookieParser());

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

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 300,
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

app.use("/api/auth", authRoutes);
app.use("/api/products", writeLimiter, productRoutes);
app.use("/api/categories", writeLimiter, categoryRoutes);
app.use("/api/notifications", authLimiter, notificationRoutes);
app.use("/api/conversations", authLimiter, messageRoutes);

app.use((req, res, next) => {
  const error = new Error("Route not found");
  error.statusCode = 404;
  next(error);
});

app.use(errorHandler);

export default app;
