import { prisma } from "../config/database.js";

export const findAll = () => {
  return prisma.category.findMany({
    orderBy: {
      id: "asc",
    },
  });
};

export const findById = (id) => {
  return prisma.category.findUnique({
    where: {
      id,
    },
  });
};

export const create = (categoryData) => {
  return prisma.category.create({
    data: categoryData,
  });
};

export const remove = (id) => {
  return prisma.category.delete({
    where: {
      id,
    },
  });
};
