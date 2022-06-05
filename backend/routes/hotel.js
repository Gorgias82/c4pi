const express = require("express");
const router = express.Router();
const con = require("../conexion");
router.get("/hoteles", (req, res, next) => {
  con.query("SELECT * from c4pi.hotel", function (err, result, fields) {
    if (err) throw err;
    //   console.log(result);
    const respuesta = result;
    res.status(200).json(respuesta);
  });
  // });
});

module.exports = router;
