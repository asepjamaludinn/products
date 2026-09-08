import bcrypt from "bcrypt";

const SALT_ROUNDS = 12;

export const DUMMY_HASH = bcrypt.hashSync(
  "dummy-password-for-timing-safety",
  SALT_ROUNDS,
);

export const hashPassword = (plainPassword) => {
  return bcrypt.hash(plainPassword, SALT_ROUNDS);
};

export const comparePassword = (plainPassword, hashedPassword) => {
  return bcrypt.compare(plainPassword, hashedPassword);
};
