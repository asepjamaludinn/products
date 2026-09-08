import { prisma } from "../config/database.js";

const buildWhere = ({ categoryId, search }) => {
  const where = {};
  if (categoryId) where.categoryId = categoryId;
  if (search) where.name = { contains: search, mode: "insensitive" };
  return Object.keys(where).length > 0 ? where : undefined;
};

export const findAll = ({ page, limit, categoryId, search }) => {
  return prisma.product.findMany({
    where: buildWhere({ categoryId, search }),
    orderBy: { id: "asc" },
    skip: (page - 1) * limit,
    take: limit,
    include: { category: { select: { id: true, name: true } } },
  });
};

export const count = ({ categoryId, search }) => {
  return prisma.product.count({ where: buildWhere({ categoryId, search }) });
};

export const findById = (id) => {
  return prisma.product.findUnique({
    where: { id },
    include: { category: { select: { id: true, name: true } } },
  });
};

export const create = (productData) => {
  return prisma.product.create({
    data: productData,
    include: { category: { select: { id: true, name: true } } },
  });
};

export const update = (id, productData) => {
  return prisma.product.update({
    where: { id },
    data: productData,
    include: { category: { select: { id: true, name: true } } },
  });
};

export const remove = (id) => {
  return prisma.product.delete({ where: { id } });
};
