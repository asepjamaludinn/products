import { Server } from "socket.io";
import { env } from "./env.js";

let io = null;

export const initSocket = (httpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: env.frontendUrl.includes(",")
        ? env.frontendUrl.split(",")
        : env.frontendUrl,
      credentials: true,
    },
  });

  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error(
      "Socket.io has not been initialized. Call initSocket() first.",
    );
  }
  return io;
};
