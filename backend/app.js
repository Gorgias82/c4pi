const express = require("express");
const bodyParser = require("body-parser");
// const { expressCspHeader, INLINE, NONE, SELF } = require("express-csp-header");
const app = express();
var mysql = require("mysql");
const http = require("http");

require("dotenv").config();
const port = process.env.PORT || 3000;
app.set("port", port);
const server = http.createServer(app);

var con = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
var bcrypt = require("bcrypt");
// const {
//   resolveSanitizationFn,
// } = require("@angular/compiler/src/render3/view/template");

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
app.post("/comprobacion_dni", (req, res, next) => {
  const dni = req.body.envio;
  let respuesta;

  con.query(
    "SELECT dni from c4pi.cliente where dni=?",
    [dni],
    function (err, result) {
      if (err) throw err;
      if (result.length > 0) {
        respuesta = true;
      } else {
        respuesta = false;
      }
      res.status(200).json(respuesta);
    }
  );
});
app.post("/comprobacion_nombre", (req, res, next) => {
  const login = req.body.envio;
  let respuesta;
  // con.connect(function (err) {
  // if (err) throw err;
  con.query(
    "SELECT id from c4pi.empleado where login=?",
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

app.post("/insercion_cliente", (req, res, next) => {
  const { dni, nombre, apellido1, apellido2 } = req.body;
  console.log(dni, nombre, apellido1, apellido2);
  con.query(
    "INSERT into c4pi.cliente(dni,nombre,apellido1,apellido2) VALUES(?,?,?,?)",
    [dni, nombre, apellido1, apellido2],
    function (err, result) {
      if (err) throw err;
      console.log(result);
      if (result.affectedRows > 0) {
        respuesta = true;
      } else {
        respuesta = false;
      }
      console.log(respuesta);
      res.status(200).json(respuesta);
    }
  );
});

app.post("/insercion_empleado", (req, res, next) => {
  const id_departamento = req.body.id_departamento;
  const nombre = req.body.nombre;
  const password = req.body.password;
  let rango = 0;
  let hash = bcrypt.hashSync(password, 5);
  con.query(
    "INSERT into c4pi.empleado(id_departamento,rango,login,password) VALUES(?,?,?,?)",
    [id_departamento, rango, nombre, hash],
    function (err, result, fields) {
      if (err) throw err;
      if (result.affectedRows > 0) {
        respuesta = result.insertId;
      } else {
        respuesta = false;
      }
      console.log(respuesta);
      res.status(200).json(respuesta);
    }
  );
});

app.post("/getEmpleado", (req, res, next) => {
  const nombre = req.body.nombre;
  con.query(
    "SELECT * from c4pi.empleado where login=?",
    [nombre],
    function (err, result) {
      if (err) throw err;
      res.status(200).json(result[0]);
    }
  );
});

app.post("/departamentos", (req, res, next) => {
  const idHotel = req.body.envio;

  con.query(
    "SELECT * from c4pi.departamento where id_hotel=?",
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
    "SELECT password from c4pi.empleado where login=?",
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

app.get("/hoteles", (req, res, next) => {
  con.query("SELECT * from c4pi.hotel", function (err, result, fields) {
    if (err) throw err;
    //   console.log(result);
    const respuesta = result;
    res.status(200).json(respuesta);
  });
  // });
});

app.get("/clientes", (req, res, next) => {
  con.query("select * from c4pi.cliente", function (err, result) {
    if (err) throw err;
    const respuesta = result;
    res.status(200).json(respuesta);
  });
});

app.post("/empleados", (req, res, next) => {
  const id = req.body.id;
  con.query(
    "select e.id,e.login,e.rango,e.color,h.nombre as hotel from c4pi.empleado e JOIN departamento d on e.id_departamento=d.id join hotel h on h.id=d.id_hotel where h.id IN (d.id_hotel) AND d.id IN(SELECT id_departamento from c4pi.empleado where id = ?) AND e.id!=?",
    [id, id],
    function (err, result) {
      if (err) throw err;
      const respuesta = result;
      res.status(200).json(respuesta);
    }
  );
});

app.get("/opiniones", (req, res, next) => {
  con.query(
    "select id_cliente, color, count(color) as cantidad from c4pi.opinion group by id_cliente, color",
    function (err, result) {
      if (err) throw err;
      const respuesta = result;
      res.status(200).json(respuesta);
    }
  );
});

app.post("/insertaOpinion", (req, res, next) => {
  const id_cliente = req.body.id_cliente;
  const id_empleado = req.body.id_empleado;

  const color = req.body.color;
  con.query(
    "SELECT * FROM c4pi.opinion WHERE id_cliente = ? and id_empleado = ?",
    [id_cliente, id_empleado],
    function (err, result, fields) {
      if (err) throw err;
      if (result.length > 0) {
        existeOpinion = true;
      } else {
        existeOpinion = false;
      }

      if (existeOpinion) {
        con.query(
          "UPDATE c4pi.opinion set color = ? where id_cliente = ? and id_empleado = ?",
          [color, id_cliente, id_empleado],
          function (err, result, fields) {
            if (err) throw err;
            if (result.affectedRows > 0) {
              respuesta = 1;
            } else {
              respuesta = 0;
            }
            res.status(200).json(respuesta);
          }
        );
      } else {
        con.query(
          "INSERT into c4pi.opinion VALUES(?,?,?,CURDATE())",
          [id_cliente, id_empleado, color],
          function (err, result, fields) {
            if (err) throw err;
            if (result.affectedRows > 0) {
              respuesta = 2;
            } else {
              respuesta = 0;
            }
            res.status(200).json(respuesta);
          }
        );
      }
    }
  );
});

module.exports = app;

server.listen(process.env.PORT || 3000);
