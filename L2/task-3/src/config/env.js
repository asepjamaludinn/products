import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().int().positive().default(3000),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  DATABASE_URL: z
    .string({ required_error: "DATABASE_URL is required" })
    .min(1, "DATABASE_URL is required")
    .url("DATABASE_URL must be a valid connection string URL"),
  API_KEY: z
    .string({ required_error: "API_KEY is required" })
    .min(16, "API_KEY must be at least 16 characters"),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("Invalid environment variables:");
  console.error(parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = {
  port: parsed.data.PORT,
  nodeEnv: parsed.data.NODE_ENV,
  isProduction: parsed.data.NODE_ENV === "production",
  databaseUrl: parsed.data.DATABASE_URL,
  apiKey: parsed.data.API_KEY,
};
