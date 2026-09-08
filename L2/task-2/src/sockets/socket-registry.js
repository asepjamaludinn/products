const userSockets = new Map();

export const registerSocket = (userId, socketId) => {
  if (!userSockets.has(userId)) userSockets.set(userId, new Set());
  userSockets.get(userId).add(socketId);
};

export const unregisterSocket = (userId, socketId) => {
  const sockets = userSockets.get(userId);
  if (!sockets) return;
  sockets.delete(socketId);
  if (sockets.size === 0) userSockets.delete(userId);
};

export const isUserOnline = (userId) => userSockets.has(userId);

export const userRoom = (userId) => `user:${userId}`;
