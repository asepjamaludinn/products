import { env } from "../config/env.js";

export const errorHandler = (err, req, res, next) => {
  console.error(err);

  let statusCode = err.statusCode;
  let message = err.message;

  switch (err.code) {
    case "P2025": {
      statusCode = 404;
      message = "Product not found";
      break;
    }
    case "P2002": {
      const target = Array.isArray(err.meta?.target)
        ? err.meta.target.join(", ")
        : (err.meta?.target ?? "field");

      statusCode = 409;
      message = `A product with this ${target} already exists`;
      break;
    }
    case "P2003": {
      statusCode = 400;
      message = "Referenced category does not exist or is still in use";
      break;
    }
    default:
      break;
  }

  const isKnownError = Boolean(statusCode);

  if (!isKnownError) {
    statusCode = 500;
    message = "Internal server error";
  } else if (statusCode === 500) {
    message = env.isProduction ? "Internal server error" : message;
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(err.errors && { errors: err.errors }),
  });
};
