import { getIO } from "../config/socket.js";
import { userRoom } from "../sockets/socket-registry.js";
import { prisma } from "../config/database.js";
import * as conversationRepository from "../repositories/conversation.repository.js";
import * as messageRepository from "../repositories/message.repository.js";
import * as notificationService from "./notification.service.js";

export const assertParticipant = async (userId, conversationId) => {
  const participant = await conversationRepository.findParticipant(
    conversationId,
    userId,
  );
  if (!participant) {
    const error = new Error("You are not part of this conversation");
    error.statusCode = 403;
    throw error;
  }
};

export const getOrCreateDirectConversation = async (userAId, userBId) => {
  const existing = await conversationRepository.findDirectConversation(
    userAId,
    userBId,
  );
  if (existing) return existing;
  return conversationRepository.createDirectConversation(userAId, userBId);
};

export const getOrCreateSupportConversation = async (userId) => {
  const admin = await prisma.user.findFirst({ where: { role: "ADMIN" } });
  if (!admin) {
    const error = new Error("Support is currently offline.");
    error.statusCode = 404;
    throw error;
  }
  return getOrCreateDirectConversation(userId, admin.id);
};

export const getUserConversations = (userId) =>
  conversationRepository.findByUser(userId);

export const getMessages = async (userId, conversationId, pagination) => {
  await assertParticipant(userId, conversationId);
  return messageRepository.findByConversation(conversationId, pagination);
};

export const sendMessage = async (
  io,
  { conversationId, senderId, content },
) => {
  await assertParticipant(senderId, conversationId);

  const trimmed = content?.trim();
  if (!trimmed) {
    const error = new Error("Message cannot be empty");
    error.statusCode = 400;
    throw error;
  }

  const message = await messageRepository.create({
    conversationId,
    senderId,
    content: trimmed,
  });

  await conversationRepository.touchUpdatedAt(conversationId);

  const socketIo = io ?? getIO();
  const roomName = `conversation:${conversationId}`;
  socketIo.to(roomName).emit("chat:message:new", message);

  const otherParticipants = await conversationRepository.findOtherParticipants(
    conversationId,
    senderId,
  );

  await Promise.all(
    otherParticipants.map(({ userId }) =>
      notificationService.notifyUser({
        userId,
        type: "CHAT",
        title: message.sender.name,
        message: trimmed,
        data: { conversationId },
      }),
    ),
  );

  return message;
};

export const markConversationAsRead = async (userId, conversationId) => {
  await assertParticipant(userId, conversationId);
  return conversationRepository.updateLastRead(conversationId, userId);
};
