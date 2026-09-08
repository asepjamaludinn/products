import * as messageService from "../../services/message.service.js";

export const registerChatHandlers = (io, socket) => {
  const currentUserId = socket.user.id;

  socket.on(
    "chat:message:send",
    async ({ conversationId, content }, callback) => {
      try {
        const message = await messageService.sendMessage(io, {
          conversationId,
          senderId: currentUserId,
          content,
        });
        callback?.({ success: true, data: message });
      } catch (err) {
        callback?.({ success: false, message: err.message });
      }
    },
  );

  socket.on("chat:typing", ({ conversationId, isTyping }) => {
    socket
      .to(`conversation:${conversationId}`)
      .emit("chat:typing", { conversationId, userId: currentUserId, isTyping });
  });

  socket.on("chat:read", async ({ conversationId }, callback) => {
    try {
      await messageService.markConversationAsRead(
        currentUserId,
        conversationId,
      );
      socket
        .to(`conversation:${conversationId}`)
        .emit("chat:read", { conversationId, userId: currentUserId });
      callback?.({ success: true });
    } catch (err) {
      callback?.({ success: false, message: err.message });
    }
  });

  socket.on("chat:join", async ({ conversationId }, callback) => {
    try {
      await messageService.assertParticipant(currentUserId, conversationId);
      socket.join(`conversation:${conversationId}`);
      callback?.({ success: true });
    } catch (err) {
      callback?.({ success: false, message: err.message });
    }
  });

  socket.on("chat:leave", ({ conversationId }) => {
    socket.leave(`conversation:${conversationId}`);
  });
};
