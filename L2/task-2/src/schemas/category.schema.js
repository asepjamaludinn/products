import { z } from "zod";

export const createCategorySchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, "Name is required")
      .max(255, "Name must be at most 255 characters"),
  })
  .strict("Unexpected field(s) in request body");

export const categoryIdSchema = z
  .object({
    id: z.coerce
      .number()
      .int("Category ID must be an integer")
      .positive("Category ID must be greater than 0"),
  })
  .strict("Unexpected field(s) in request params");
