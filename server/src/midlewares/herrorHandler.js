const AppHerror = require("../helpers/App.Herror");
const logger = require("../utils/logger");

const handleHerror = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Error interno del servidor";
  const data = err.data || null;

  // el objeto de log
  const errorLog = {
    status,
    message,
    path: req.originalUrl,
    method: req.method,
    ...(data && { data }),
    stack: err.stack,
  };

  // log nivel error
  logger.error(errorLog);

  // respuesta al cliente, sin stack ni info sensible
  res.status(status).json({
    error: true,
    message,
    ...(data && { data }),
  });
};

module.exports = handleHerror;
