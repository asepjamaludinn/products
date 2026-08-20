import { z } from "zod";

const POSTGRES_INT_MAX = 2_147_483_647;

export const createProductSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, "Name is required")
      .max(255, "Name must be at most 255 characters"),

    price: z
      .number()
      .int("Price must be an integer")
      .positive("Price must be greater than 0")
      .max(POSTGRES_INT_MAX, "Price is too large"),

    stock: z
      .number()
      .int("Stock must be an integer")
      .nonnegative("Stock cannot be negative")
      .max(POSTGRES_INT_MAX, "Stock is too large"),
  })
  .strict("Unexpected field(s) in request body");

export const updateProductSchema = createProductSchema;

export const productIdSchema = z
  .object({
    id: z.coerce
      .number()
      .int("Product ID must be an integer")
      .positive("Product ID must be greater than 0")
      .max(POSTGRES_INT_MAX, "Product ID is too large"),
  })
  .strict("Unexpected field(s) in request params");
