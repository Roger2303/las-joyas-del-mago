const bcrypt = require("bcryptjs");

// Hashea una contraseña
const hashPassword = async (plainPassword) => {
  const saltRounds = 10;
  return await bcrypt.hash(plainPassword, saltRounds);
};

// Compara contraseña ingresada vs hasheada
const comparePassword = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

module.exports = { hashPassword, comparePassword };
