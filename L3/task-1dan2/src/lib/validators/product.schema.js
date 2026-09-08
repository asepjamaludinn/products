import { z } from "zod";

export const productSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(255),
  price: z.coerce
    .number()
    .int("Price must be an integer")
    .positive("Price must be greater than 0"),
  stock: z.coerce
    .number()
    .int("Stock must be an integer")
    .nonnegative("Stock cannot be negative"),
  categoryId: z.coerce
    .number()
    .int("Category is required")
    .positive("Category is required"),
});
