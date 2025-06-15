const app = require("./app");
const dotenv = require("dotenv");
const db = require("./src/db/database");
const initDb = require("./src/db/initDb");
const logger = require("./src/utils/logger");

dotenv.config();

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await db.query("SELECT 1");
    logger.info("Conexión a postgres establecida correctamente");

    await initDb(); //inicializa la base de datos con entidades y relaciones

    app.listen(PORT, () => {
      logger.info(`Servidor escuchando en el puerto ${PORT}`);
    });
  } catch (error) {
    logger.error(`No se pudo conectar a la BDD: ${error.message}`);
    process.exit(1);
  }
};

startServer();
