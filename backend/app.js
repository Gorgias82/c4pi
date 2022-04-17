const express = require("express");
const bodyParser = require("body-parser");
// const { expressCspHeader, INLINE, NONE, SELF } = require("express-csp-header");
const app = express();
var mysql = require("mysql");

// var con = mysql.createConnection({
//   host: "localhost",
//   user: "jorge",
//   password: "Nohay2sin3",
// });

var con = mysql.createPool({
  host: "localhost",
  user: "jorge",
  password: "Nohay2sin3",
  database: "c4pi",
});
var bcrypt = require("bcrypt");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

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

app.post("/comprobacion_nombre", (req, res, next) => {
  const login = req.body.envio;
  let respuesta;
  // con.connect(function (err) {
  // if (err) throw err;
  con.query(
    "SELECT id from c4pi.empleados where login=?",
    [login],
    function (err, result, fields) {
      if (err) throw err;
      if (result.length > 0) {
        respuesta = true;
      } else {
        respuesta = false;
      }
      res.status(200).json(respuesta);
    }
  );
  // });
});

app.post("/insercion_empleado", (req, res, next) => {
  const idDep = req.body.idDep;
  const nombre = req.body.nombre;
  const password = req.body.password;
  let hash = bcrypt.hashSync(password, 5);
  con.query(
    "INSERT into c4pi.empleados(id_departamento,rango,login,password) VALUES(?,0,?,?)",
    [idDep, nombre, hash],
    function (err, result, fields) {
      if (err) throw err;
      if (result.affectedRows > 0) {
        respuesta = true;
      } else {
        respuesta = false;
      }
      res.status(200).json(respuesta);
    }
  );
});

app.post("/departamentos", (req, res, next) => {
  const idHotel = req.body.envio;

  con.query(
    "SELECT * from c4pi.departamentos where id_hotel=?",
    [idHotel],
    function (err, result, fields) {
      if (err) throw err;
      res.status(200).json(result);
    }
  );
});

app.post("/comprobacion_password", (req, res, next) => {
  let respuesta = false;
  const login = req.body.nombre;
  const password = req.body.password;
  con.query(
    "SELECT password from c4pi.empleados where login=?",
    [login],
    function (err, result) {
      if (err) throw err;
      if (result.length > 0) {
        respuesta = bcrypt.compareSync(password, result[0].password);
        res.status(200).json(respuesta);
      }
    }
  );
});
// app.get("/personas", (req, res, next) => {
//   const personas = [{ nombre: "juan", apellido: "vicente", color: 2 }];
//   //res.json(posts);

//   res.status(200).json({
//     message: "Posts mandados",
//     personas: personas,
//   });
// });

app.get("/hoteles", (req, res, next) => {
  //res.json(posts);
  // con.connect(function (err) {
  //   if (err) throw err;
  con.query("SELECT * from c4pi.hoteles", function (err, result, fields) {
    if (err) throw err;
    //   console.log(result);
    const respuesta = result;
    res.status(200).json(respuesta);
  });
  // });
});

module.exports = app;
