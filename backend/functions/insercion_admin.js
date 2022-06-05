var mysql = require("mysql");
require("dotenv").config();
var con = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
var bcrypt = require("bcrypt");
function insertAdmin() {
  let hash = bcrypt.hashSync(process.env.HOTEL_ADMIN_PASSWORD, 5);
  con.query(
    "INSERT into c4pi.empleado(id_departamento,rango,login,password) VALUES(?,?,?,?)",
    [process.env.DEP_ID, 1, "admin", hash],
    function (err, result, fields) {
      if (err) throw err;
      if (result.affectedRows > 0) {
        console.log("admin introducido correctamente");
      }
    }
  );
}

insertAdmin();
