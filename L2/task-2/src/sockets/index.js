import { socketAuthMiddleware } from "./socket.middleware.js";
import {
  registerSocket,
  unregisterSocket,
  userRoom,
} from "./socket-registry.js";
import { registerNotificationHandlers } from "./handlers/notification.handler.js";
import { registerChatHandlers } from "./handlers/chat.handler.js";

export const registerSocketServer = (io) => {
  io.use(socketAuthMiddleware);

  io.on("connection", (socket) => {
    const { id: userId, name } = socket.user;

    socket.join(userRoom(userId));
    registerSocket(userId, socket.id);

    console.log(`[socket] ${name} connected (${socket.id})`);

    registerNotificationHandlers(io, socket);
    registerChatHandlers(io, socket);

    socket.on("disconnect", () => {
      unregisterSocket(userId, socket.id);
      console.log(`[socket] ${name} disconnected (${socket.id})`);
    });
  });
};
