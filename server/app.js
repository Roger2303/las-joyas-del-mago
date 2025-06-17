const express = require("express");
const cors = require("cors");

const userRoutes = require("./src/routes/user.routes");
const authRoutes = require("./src/routes/auth.routes");
const errorHandler = require("./src/midlewares/herrorHandler");
const cardRoutes = require("./src/routes/cards.routes");
const salesRoutes = require("./src/routes/sales.routes");

const app = express();

//  CORS suelto para DEMO
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200); // matar el preflight
  }

  next();
});

// Middlewares
app.use(express.json());

// Rutas
app.use("/api/v1", userRoutes);
app.use("/api/v1", authRoutes);
app.use("/api/v1", cardRoutes);
app.use("/api/v1", salesRoutes);

// Handler de errores
app.use(errorHandler);

module.exports = app;
