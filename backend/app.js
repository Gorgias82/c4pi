const express = require("express");
const bodyParser = require("body-parser");
const app = express();
var mysql = require("mysql");
const http = require("http");
const clienteRoutes = require("./routes/cliente.js");
const departamentoRoutes = require("./routes/departamento.js");
const empleadoRoutes = require("./routes/empleado.js");
const hotelRoutes = require("./routes/hotel.js");
const opinionRoutes = require("./routes/opinion.js");
const path = require('node:path');
require("dotenv").config();

const con = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/", express.static(path.join(__dirname, "angular")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-Width,Content-Type,Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PATCH,DELETE,PUT,OPTIONS"
  );
  next();
});

app.use("/cliente", clienteRoutes);
app.use("/departamento", departamentoRoutes);
app.use("/empleado", empleadoRoutes);
app.use("/hotel", hotelRoutes);
app.use("/opinion", opinionRoutes);
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "angular","index.html"));
})

module.exports = app;

