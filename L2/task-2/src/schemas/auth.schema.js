import { z } from "zod";

export const signupSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, "Name is required")
      .max(255, "Name must be at most 255 characters"),

    email: z
      .string()
      .trim()
      .toLowerCase()
      .min(1, "Email is required")
      .email("Invalid email format")
      .max(255, "Email must be at most 255 characters"),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(128, "Password must be at most 128 characters")
      .regex(/[a-zA-Z]/, "Password must contain at least one letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
  })
  .strict("Unexpected field(s) in request body");

export const loginSchema = z
  .object({
    email: z
      .string()
      .trim()
      .toLowerCase()
      .min(1, "Email is required")
      .email("Invalid email format"),

    password: z.string().min(1, "Password is required"),
  })
  .strict("Unexpected field(s) in request body");
