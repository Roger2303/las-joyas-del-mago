const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const userRoutes = require('./src/routes/user.routes');
//const errorHandler = require('./src/midlewares');

const app = express();

//midlewares globales//
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//rutas API
app.use("/api/v1", userRoutes);


//midlewares customs
//app.use(errorHandler);

module.exports = app;