import * as userRepository from "../repositories/user.repository.js";
import {
  hashPassword,
  comparePassword,
  DUMMY_HASH,
} from "../utils/password.util.js";
import { signToken } from "../utils/jwt.util.js";

export const signup = async ({ name, email, password }) => {
  const existingUser = await userRepository.findByEmailWithPassword(email);
  if (existingUser) {
    const error = new Error("Email is already registered");
    error.statusCode = 409;
    throw error;
  }
  const hashedPassword = await hashPassword(password);
  const user = await userRepository.create({
    name,
    email,
    password: hashedPassword,
  });
  const token = signToken(user.id);
  return { user, token };
};

export const login = async ({ email, password }) => {
  const user = await userRepository.findByEmailWithPassword(email);
  const invalidCredentialsError = () => {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    return error;
  };
  const isPasswordValid = await comparePassword(
    password,
    user ? user.password : DUMMY_HASH,
  );
  if (!user || !isPasswordValid) throw invalidCredentialsError();

  const token = signToken(user.id);
  const { password: _password, ...safeUser } = user;
  return { user: safeUser, token };
};

export const logout = async () => {};

export const updateProfile = async (userId, { name, email }) => {
  const existingUser = await userRepository.findByEmailWithPassword(email);
  if (existingUser && existingUser.id !== userId) {
    const error = new Error("Email is already in use by another account");
    error.statusCode = 409;
    throw error;
  }
  return userRepository.update(userId, { name, email });
};

export const updatePassword = async (userId, { oldPassword, newPassword }) => {
  const user = await userRepository.findByIdWithPassword(userId);
  const isPasswordValid = await comparePassword(oldPassword, user.password);

  if (!isPasswordValid) {
    const error = new Error("Incorrect old password");
    error.statusCode = 400;
    throw error;
  }

  const hashedPassword = await hashPassword(newPassword);
  return userRepository.update(userId, { password: hashedPassword });
};
