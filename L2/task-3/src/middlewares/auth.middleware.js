import { timingSafeEqual } from "node:crypto";
import { env } from "../config/env.js";

const expectedKeyBuffer = Buffer.from(env.apiKey);

const safeCompare = (provided) => {
  const providedBuffer = Buffer.from(provided);

  if (providedBuffer.length !== expectedKeyBuffer.length) {
    return false;
  }

  return timingSafeEqual(providedBuffer, expectedKeyBuffer);
};

export const requireApiKey = (req, res, next) => {
  const providedKey = req.header("x-api-key");

  if (!providedKey || !safeCompare(providedKey)) {
    const error = new Error("Unauthorized");
    error.statusCode = 401;
    return next(error);
  }

  next();
};
