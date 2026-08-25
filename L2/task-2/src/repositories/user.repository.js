import { prisma } from "../config/database.js";

const SAFE_USER_SELECT = {
  id: true,
  name: true,
  email: true,
  role: true,
  createdAt: true,
};

export const findByEmailWithPassword = (email) => {
  return prisma.user.findUnique({
    where: { email },
  });
};

export const findById = (id) => {
  return prisma.user.findUnique({
    where: { id },
    select: SAFE_USER_SELECT,
  });
};

export const create = (userData) => {
  return prisma.user.create({
    data: userData,
    select: SAFE_USER_SELECT,
  });
};
