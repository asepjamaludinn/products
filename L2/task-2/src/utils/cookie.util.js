import { env } from "../config/env.js";

export const AUTH_COOKIE_NAME = "token";

export const getAuthCookieOptions = () => ({
  httpOnly: true,
  secure: env.isProduction,
  sameSite: "lax",
  maxAge: env.jwtExpiresInSeconds * 1000,
  path: "/",
});
