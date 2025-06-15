const userModel = require("../models/user.model");
const { hashPassword } = require("../helpers/hashHelper");
const AppHerror = require("../helpers/App.Herror");
const logger = require("../utils/logger");
const { generateToken } = require("../helpers/generateToken");

const register = async ({ name, email, password }) => {
  // Validación de campos obligatorios
  if (!name || !email || !password) {
    logger.warn("Intento de registro con campos faltantes");
    throw new AppHerror("Faltan campos obligatorios", 400);
  }

  // ¿Existe el usuario?
  const userExist = await userModel.findByEmail(email);
  if (userExist) {
    logger.warn(`Intento de registro con email existente: ${email}`);
    throw new AppHerror("El email ya está registrado", 409);
  }

  // Hashear contraseña
  const hashedPassword = await hashPassword(password);

  // crear usuario en la db
  const newUser = await userModel.create({
    name,
    email,
    password: hashedPassword,
  });

  // generar token para el nevo usuario
  const token = generateToken({
    id: newUser.id,
    email: newUser.email,
  });

  logger.info(`Nuevo usuario registrado: ${email}`);

  // devolver respuesta con token y datos del usuario
  return {
    message: "Usuario registrado exitosamente",
    token,
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      createdAt: newUser.created_at,
    },
  };
};

module.exports = { register };
