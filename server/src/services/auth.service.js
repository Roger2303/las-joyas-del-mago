const authModel = require("../models/auth.model");
const { generateToken } = require("../helpers/generateToken");
const { comparePassword } = require("../helpers/hashHelper");
const AppHerror = require("../helpers/App.Herror");

async function login(email, password) {
  const user = await authModel.getUserByEmail(email);
  if (!user) throw new AppHerror("Usuario o contraseña incorrectos", 401);

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) throw new AppHerror("Usuario o contraseña incorrectos", 401);

  const token = generateToken({ id: user.id, email: user.email });
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.created_at,
    token,
  };
}

module.exports = { login };
