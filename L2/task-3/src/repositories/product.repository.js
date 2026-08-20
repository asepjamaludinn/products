import { prisma } from "../config/database.js";

export const findAll = () => {
  return prisma.product.findMany({
    orderBy: {
      id: "asc",
    },
  });
};

export const findById = (id) => {
  return prisma.product.findUnique({
    where: {
      id,
    },
  });
};

export const create = (productData) => {
  return prisma.product.create({
    data: productData,
  });
};

export const update = (id, productData) => {
  return prisma.product.update({
    where: {
      id,
    },
    data: productData,
  });
};

export const remove = (id) => {
  return prisma.product.delete({
    where: {
      id,
    },
  });
};
