class AppError extends Error {
  /**
   * @param {string} message Mensaje para el cliente
   * @param {number} status Código HTTP (por defecto 500)
   * @param {any} [data] Info extra opcional para debug
   */
  constructor(message, status = 500, data = null) {
    super(message);
    this.status = status;
    this.name = "AppError";
    if (data) {
      this.data = data; // detalles internos, info del request, etc.
    }
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
