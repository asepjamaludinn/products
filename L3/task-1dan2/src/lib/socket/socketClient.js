import { io } from "socket.io-client";

const getSocketOrigin = () => {
  try {
    const url = new URL(process.env.NEXT_PUBLIC_API_URL);
    return url.origin;
  } catch {
    return process.env.NEXT_PUBLIC_API_URL;
  }
};

const SOCKET_URL = getSocketOrigin();

let socket = null;

export const getSocket = () => {
  if (socket) return socket;

  socket = io(SOCKET_URL, {
    withCredentials: true,
    autoConnect: false,
    transports: ["websocket"],
  });

  return socket;
};

export const disconnectSocket = () => {
  socket?.disconnect();
  socket = null;
};
