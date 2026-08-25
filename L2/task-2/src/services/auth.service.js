import bcrypt from "bcrypt";
import * as userRepository from "../repositories/user.repository.js";
import { hashPassword, comparePassword } from "../utils/password.util.js";
import { signToken } from "../utils/jwt.util.js";

const DUMMY_HASH = bcrypt.hashSync("dummy-password-for-timing-safety", 12);

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

  if (!user || !isPasswordValid) {
    throw invalidCredentialsError();
  }

  const token = signToken(user.id);

  const { password: _password, ...safeUser } = user;

  return { user: safeUser, token };
};
