const express = require("express");
const router = express.Router();
const con = require("../conexion");
router.get("/opiniones", (req, res, next) => {
  con.query(
    "select id_cliente, color, count(color) as cantidad from c4pi.opinion group by id_cliente, color",
    function (err, result) {
      if (err) throw err;
      const respuesta = result;
      res.status(200).json(respuesta);
    }
  );
});

router.post("/insertaOpinion", (req, res, next) => {
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

module.exports = router;
