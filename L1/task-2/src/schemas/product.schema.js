import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),

  price: z.number().positive("Price must be greater than 0"),

  stock: z
    .number()
    .int("Stock must be an integer")
    .nonnegative("Stock cannot be negative"),
});

export const updateProductSchema = createProductSchema;

export const productIdSchema = z.object({
  id: z.string().regex(/^\d+$/, "Product ID must be a number"),
});
