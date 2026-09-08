import { getIO } from "../config/socket.js";
import { userRoom, isUserOnline } from "../sockets/socket-registry.js";
import * as notificationRepository from "../repositories/notification.repository.js";

export const notifyUser = async ({ userId, type, title, message, data }) => {
  const notification = await notificationRepository.create({
    userId,
    type,
    title,
    message,
    data,
  });

  const io = getIO();
  io.to(userRoom(userId)).emit("notification:new", notification);

  return notification;
};

export const notifyUsers = (userIds, payload) =>
  Promise.all(userIds.map((userId) => notifyUser({ ...payload, userId })));

export const getNotifications = (userId, pagination) =>
  notificationRepository.findByUser(userId, pagination);

export const getUnreadCount = (userId) =>
  notificationRepository.countUnread(userId);

export const markAsRead = (userId, id) =>
  notificationRepository.markAsRead(userId, Number(id));

export const markAllAsRead = (userId) =>
  notificationRepository.markAllAsRead(userId);

export const isRecipientOnline = isUserOnline;
