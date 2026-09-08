import { prisma } from "../config/database.js";

export const create = (data) => prisma.notification.create({ data });

export const findByUser = (userId, { page = 1, limit = 20 } = {}) => {
  const pageNum = Number(page) || 1;
  const limitNum = Number(limit) || 20;

  return prisma.notification.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    skip: (pageNum - 1) * limitNum,
    take: limitNum,
  });
};

export const countUnread = (userId) =>
  prisma.notification.count({ where: { userId, isRead: false } });

export const markAsRead = (userId, id) =>
  prisma.notification.updateMany({
    where: { id: Number(id), userId },
    data: { isRead: true },
  });

export const markAllAsRead = (userId) =>
  prisma.notification.updateMany({
    where: { userId, isRead: false },
    data: { isRead: true },
  });
