const express = require("express");
const router = express.Router();
const con = require("../conexion");

router.post("/insercion_cliente", (req, res, next) => {
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

router.get("/clientes", (req, res, next) => {
  con.query("select * from c4pi.cliente", function (err, result) {
    if (err) throw err;
    const respuesta = result;
    res.status(200).json(respuesta);
  });
});

router.post("/comprobacion_dni", (req, res, next) => {
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

module.exports = router;
