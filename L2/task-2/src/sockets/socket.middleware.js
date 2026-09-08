import cookie from "cookie";
import { verifyToken } from "../utils/jwt.util.js";
import { AUTH_COOKIE_NAME } from "../utils/cookie.util.js";
import * as userRepository from "../repositories/user.repository.js";

export const socketAuthMiddleware = async (socket, next) => {
  try {
    const rawCookies = socket.handshake.headers?.cookie;
    if (!rawCookies) {
      return next(new Error("UNAUTHORIZED"));
    }

    const cookies = cookie.parse(rawCookies); // <- ganti di sini
    const token = cookies[AUTH_COOKIE_NAME];
    if (!token) {
      return next(new Error("UNAUTHORIZED"));
    }

    const decoded = verifyToken(token);
    const user = await userRepository.findById(decoded.id);
    if (!user) {
      return next(new Error("UNAUTHORIZED"));
    }

    socket.user = user;
    next();
  } catch {
    next(new Error("UNAUTHORIZED"));
  }
};
