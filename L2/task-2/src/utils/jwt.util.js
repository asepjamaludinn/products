import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

const JWT_ALGORITHM = "HS256";

export const signToken = (userId) => {
  return jwt.sign({ id: userId }, env.jwtSecret, {
    algorithm: JWT_ALGORITHM,
    expiresIn: env.jwtExpiresInSeconds,
  });
};

export const verifyToken = (token) => {
  return jwt.verify(token, env.jwtSecret, {
    algorithms: [JWT_ALGORITHM],
  });
};
