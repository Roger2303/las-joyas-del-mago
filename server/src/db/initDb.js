const fs = require("fs");
const path = require("path");
const db = require("./database");
const logger = require("../utils/logger");

async function initDb() {
  const sql = fs.readFileSync(path.join(__dirname, "init.sql"), "utf8");
  try {
    await db.query(sql);
    logger.info("Tablas verificadas/creadas correctamente 👌");
  } catch (err) {
    logger.error("Error creando tablas:", err);
  }
}

module.exports = initDb;
