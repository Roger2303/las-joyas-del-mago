const app = require('./app');
const dotenv = require('dotenv');
const db = require('./src/db/database');

dotenv.config();

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await db.query('SELECT 1');
    console.log('Conexión a postgres establecida correctamente');

    app.listen(PORT, () => {
      console.log('Servidor corriendo en puerto' + PORT);
    })
  } catch (error) {
    console.error('No se pudo conectar a la BDD:', error.message);
    process.exit(1);
  }
};

startServer();