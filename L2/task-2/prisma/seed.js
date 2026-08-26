import "dotenv/config";
import bcrypt from "bcrypt";
import { z } from "zod";
import { prisma } from "../src/config/database.js";

const SALT_ROUNDS = 12;

const seedEnvSchema = z.object({
  ADMIN_NAME: z
    .string({ required_error: "ADMIN_NAME is required for seeding" })
    .min(1, "ADMIN_NAME is required for seeding"),
  ADMIN_EMAIL: z
    .string({ required_error: "ADMIN_EMAIL is required for seeding" })
    .email("ADMIN_EMAIL must be a valid email"),
  ADMIN_PASSWORD: z
    .string({ required_error: "ADMIN_PASSWORD is required for seeding" })
    .min(8, "ADMIN_PASSWORD must be at least 8 characters")
    .regex(/[a-zA-Z]/, "ADMIN_PASSWORD must contain at least one letter")
    .regex(/[0-9]/, "ADMIN_PASSWORD must contain at least one number"),
});

const main = async () => {
  const parsed = seedEnvSchema.safeParse(process.env);

  if (!parsed.success) {
    console.error("Invalid admin seed environment variables:");
    console.error(parsed.error.flatten().fieldErrors);
    process.exit(1);
  }

  const { ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD } = parsed.data;
  const normalizedEmail = ADMIN_EMAIL.trim().toLowerCase();

  const existingAdmin = await prisma.user.findUnique({
    where: { email: normalizedEmail },
  });

  if (existingAdmin) {
    if (existingAdmin.role !== "ADMIN") {
      await prisma.user.update({
        where: { email: normalizedEmail },
        data: { role: "ADMIN" },
      });
      console.log(`Existing user "${normalizedEmail}" promoted to ADMIN.`);
    } else {
      console.log(`Admin "${normalizedEmail}" already exists. Skipping.`);
    }
    return;
  }

  const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, SALT_ROUNDS);

  await prisma.user.create({
    data: {
      name: ADMIN_NAME,
      email: normalizedEmail,
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  console.log(`Admin user "${normalizedEmail}" created successfully.`);
};

main()
  .catch((error) => {
    console.error("Seeding failed:");
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
