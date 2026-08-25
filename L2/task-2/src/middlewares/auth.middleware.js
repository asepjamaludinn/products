import { verifyToken } from "../utils/jwt.util.js";
import { AUTH_COOKIE_NAME } from "../utils/cookie.util.js";
import * as userRepository from "../repositories/user.repository.js";

export const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies?.[AUTH_COOKIE_NAME];

    if (!token) {
      const error = new Error("Authentication required");
      error.statusCode = 401;
      return next(error);
    }

    const decoded = verifyToken(token);

    const user = await userRepository.findById(decoded.id);

    if (!user) {
      const error = new Error("User no longer exists");
      error.statusCode = 401;
      return next(error);
    }

    req.user = user;
    next();
  } catch (err) {
    const error = new Error("Invalid or expired token");
    error.statusCode = 401;
    next(error);
  }
};

export const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      const error = new Error(
        "You do not have permission to perform this action",
      );
      error.statusCode = 403;
      return next(error);
    }

    next();
  };
};
