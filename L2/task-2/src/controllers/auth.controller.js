import * as authService from "../services/auth.service.js";
import {
  AUTH_COOKIE_NAME,
  getAuthCookieOptions,
} from "../utils/cookie.util.js";

export const signup = async (req, res) => {
  const { user, token } = await authService.signup(req.body);
  res.cookie(AUTH_COOKIE_NAME, token, getAuthCookieOptions());
  res.status(201).json({
    success: true,
    message: "Account created successfully",
    data: user,
  });
};

export const login = async (req, res) => {
  const { user, token } = await authService.login(req.body);
  res.cookie(AUTH_COOKIE_NAME, token, getAuthCookieOptions());
  res
    .status(200)
    .json({ success: true, message: "Login successful", data: user });
};

export const logout = async (req, res) => {
  res.clearCookie(AUTH_COOKIE_NAME, { path: "/" });
  res.status(200).json({ success: true, message: "Logout successful" });
};

export const me = async (req, res) => {
  res.status(200).json({ success: true, data: req.user });
};

export const updateProfile = async (req, res) => {
  const user = await authService.updateProfile(req.user.id, req.body);
  res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    data: user,
  });
};

export const updatePassword = async (req, res) => {
  await authService.updatePassword(req.user.id, req.body);
  res
    .status(200)
    .json({ success: true, message: "Password updated successfully" });
};
