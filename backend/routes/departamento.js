const express = require("express");
const router = express.Router();
const con = require("../conexion");
router.post("/departamentos", (req, res, next) => {
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

module.exports = router;
