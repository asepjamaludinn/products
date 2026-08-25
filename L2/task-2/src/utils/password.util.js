import bcrypt from "bcrypt";

const SALT_ROUNDS = 12;

export const hashPassword = (plainPassword) => {
  return bcrypt.hash(plainPassword, SALT_ROUNDS);
};

export const comparePassword = (plainPassword, hashedPassword) => {
  return bcrypt.compare(plainPassword, hashedPassword);
};
