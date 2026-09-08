import * as notificationService from "../../services/notification.service.js";

export const registerNotificationHandlers = (io, socket) => {
  socket.on("notification:read", async (notificationId, callback) => {
    try {
      await notificationService.markAsRead(socket.user.id, notificationId);
      callback?.({ success: true });
    } catch (err) {
      callback?.({ success: false, message: err.message });
    }
  });
};
