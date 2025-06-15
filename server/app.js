const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const userRoutes = require("./src/routes/user.routes");
const authRoutes = require("./src/routes/auth.routes");
const errorHandler = require("./src/midlewares/herrorHandler");

const app = express();

//midlewares globales//
app.use(cors());
app.use(express.json());

//rutas API
app.use("/api/v1", userRoutes);
app.use("/api/v1", authRoutes);

//midlewares customs
app.use(errorHandler);

module.exports = app;
