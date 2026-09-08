import { prisma } from "../config/database.js";

export const findDirectConversation = (userAId, userBId) =>
  prisma.conversation.findFirst({
    where: {
      AND: [
        { participants: { some: { userId: userAId } } },
        { participants: { some: { userId: userBId } } },
      ],
    },
  });

export const createDirectConversation = (userAId, userBId) =>
  prisma.conversation.create({
    data: {
      participants: {
        create: [{ userId: userAId }, { userId: userBId }],
      },
    },
    include: { participants: true },
  });

export const findByUser = (userId) =>
  prisma.conversation.findMany({
    where: { participants: { some: { userId } } },
    include: {
      participants: {
        include: { user: { select: { id: true, name: true, role: true } } },
      },
      messages: { orderBy: { createdAt: "desc" }, take: 1 },
    },
    orderBy: { updatedAt: "desc" },
  });

export const findParticipant = (conversationId, userId) =>
  prisma.conversationParticipant.findUnique({
    where: { conversationId_userId: { conversationId, userId } },
  });

export const findOtherParticipants = (conversationId, excludingUserId) =>
  prisma.conversationParticipant.findMany({
    where: { conversationId, userId: { not: excludingUserId } },
  });

export const touchUpdatedAt = (conversationId) =>
  prisma.conversation.update({
    where: { id: conversationId },
    data: { updatedAt: new Date() },
  });

export const updateLastRead = (conversationId, userId) =>
  prisma.conversationParticipant.update({
    where: { conversationId_userId: { conversationId, userId } },
    data: { lastReadAt: new Date() },
  });
