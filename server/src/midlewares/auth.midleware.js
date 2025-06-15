// middlewares/authMiddleware.js

const jwt = require("jsonwebtoken");

/**
 * Middleware de autenticación JWT
 * Protege rutas privadas, validando el token enviado en el header 'Authorization'
 */
const authMiddleware = (req, res, next) => {
  // Esperamos 'Authorization: Bearer <token>'
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res
      .status(401)
      .json({ error: "No token provided. Acceso denegado." });
  }

  // Extraemos el token después de "Bearer "
  const tokenParts = authHeader.split(" ");
  if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
    return res
      .status(401)
      .json({ error: "Formato de token inválido. Usa: Bearer <token>" });
  }
  const token = tokenParts[1];

  try {
    // Verificamos el token y metemos el payload en req.user
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Ejemplo: { id, username, role, iat, exp }
    next();
  } catch (err) {
    return res.status(401).json({ error: "Token inválido o expirado." });
  }
};

module.exports = authMiddleware;
