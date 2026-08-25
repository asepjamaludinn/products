import { prisma } from "../config/database.js";

export const findAll = ({ page, limit, categoryId }) => {
  const where = categoryId ? { categoryId } : undefined;

  return prisma.product.findMany({
    where,
    orderBy: {
      id: "asc",
    },
    skip: (page - 1) * limit,
    take: limit,
    include: {
      category: {
        select: { id: true, name: true },
      },
    },
  });
};

export const count = ({ categoryId }) => {
  const where = categoryId ? { categoryId } : undefined;

  return prisma.product.count({ where });
};

export const findById = (id) => {
  return prisma.product.findUnique({
    where: {
      id,
    },
    include: {
      category: {
        select: { id: true, name: true },
      },
    },
  });
};

export const create = (productData) => {
  return prisma.product.create({
    data: productData,
    include: {
      category: {
        select: { id: true, name: true },
      },
    },
  });
};

export const update = (id, productData) => {
  return prisma.product.update({
    where: {
      id,
    },
    data: productData,
    include: {
      category: {
        select: { id: true, name: true },
      },
    },
  });
};

export const remove = (id) => {
  return prisma.product.delete({
    where: {
      id,
    },
  });
};
