const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const con = require("../conexion");

router.post("/comprobacion_nombre", (req, res, next) => {
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

router.post("/insercion_empleado", (req, res, next) => {
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

router.post("/getEmpleado", (req, res, next) => {
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

router.post("/comprobacion_password", (req, res, next) => {
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

router.post("/empleados", (req, res, next) => {
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

router.post("/deleteEmpleado", (req, res, next) => {
  const id = req.body.id;
  console.log(id);
  con.query(
    "DELETE from c4pi.empleado where id = ?",
    [id],
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

router.post("/setColorEmpleado", (req, res, next) => {
  const color = req.body.color;
  const id = req.body.id;
  con.query(
    "UPDATE c4pi.empleado set color = ? where id = ?",
    [color, id],
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

module.exports = router;
