import * as notificationService from "../services/notification.service.js";

export const getNotifications = async (req, res) => {
  const notifications = await notificationService.getNotifications(
    req.user.id,
    req.query,
  );
  const unreadCount = await notificationService.getUnreadCount(req.user.id);

  res.status(200).json({ success: true, data: notifications, unreadCount });
};

export const readNotification = async (req, res) => {
  await notificationService.markAsRead(req.user.id, req.params.id);
  res
    .status(200)
    .json({ success: true, message: "Notification marked as read" });
};

export const readAllNotifications = async (req, res) => {
  await notificationService.markAllAsRead(req.user.id);
  res
    .status(200)
    .json({ success: true, message: "All notifications marked as read" });
};
