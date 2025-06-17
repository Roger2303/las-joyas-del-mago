const jwt = require("jsonwebtoken");
const logger = require("../utils/logger");

/**
 * Middleware de autenticación JWT
 * Protege rutas privadas, validando el token enviado en el header 'Authorization'
 */
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    logger.warn("Acceso denegado: No token provided");
    return res
      .status(401)
      .json({ error: "No token provided. Acceso denegado." });
  }

  const tokenParts = authHeader.split(" ");
  if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
    logger.warn("Acceso denegado: Formato de token inválido");
    return res
      .status(401)
      .json({ error: "Formato de token inválido. Usa: Bearer <token>" });
  }
  const token = tokenParts[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    logger.warn(
      `Acceso denegado: Token inválido o expirado. Detalle: ${err.message}`
    );
    return res.status(401).json({ error: "Token inválido o expirado." });
  }
};

module.exports = authMiddleware;
