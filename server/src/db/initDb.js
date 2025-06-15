const fs = require("fs");
const path = require("path");
const db = require("./database"); // tu pool de pg

async function initDb() {
  const sql = fs.readFileSync(path.join(__dirname, "init.sql"), "utf8");
  try {
    await db.query(sql);
    console.log("Tablas verificadas/creadas correctamente 👌");
  } catch (err) {
    console.error("Error creando tablas:", err);
  }
}

module.exports = initDb;
