//accede a la base de datos para buscar un usuario por su correo electrónico//

const db = require("../db/database");

async function getUserByEmail(email) {
  const result = await db.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  return result.rows[0];
}

module.exports = { getUserByEmail };
