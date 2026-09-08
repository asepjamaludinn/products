import { prisma } from "../config/database.js";

export const create = (data) =>
  prisma.message.create({
    data,
    include: { sender: { select: { id: true, name: true } } },
  });

export const findByConversation = (
  conversationId,
  { page = 1, limit = 30 } = {},
) =>
  prisma.message.findMany({
    where: { conversationId },
    orderBy: { createdAt: "desc" },
    skip: (page - 1) * limit,
    take: limit,
    include: { sender: { select: { id: true, name: true } } },
  });
