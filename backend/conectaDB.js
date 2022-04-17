var mysql = require("mysql");

var con = mysql.createConnection({
  host: "localhost",
  user: "jorge",
  password: "Nohay2sin3",
  database: "c4pi",
});
var bcrypt = require("bcrypt");

// con.connect(function (err) {
//   if (err) throw err;
//   console.log("Connected!");
// });
function getHoteles() {
  con.connect(function (err) {
    if (err) throw err;
    con.query("SELECT * from c4pi.hoteles", function (err, result, fields) {
      if (err) throw err;
      console.log(result);
    });
  });
}

function getDepartamentos(idHotel) {
  con.connect(function (err) {
    if (err) throw err;
    con.query(
      "SELECT * from c4pi.departamentos where id_hotel=?",
      [idHotel],
      function (err, result, fields) {
        if (err) throw err;
        console.log(result);
      }
    );
  });
}
function existeNombre(login) {
  con.connect(function (err) {
    if (err) throw err;
    con.query(
      "SELECT id from c4pi.empleados where login=?",
      [login],
      function (err, result, fields) {
        if (err) throw err;
        console.log(result.affectedRows);
      }
    );
  });
}

function insertaEmpleado(id_departamento, rango, login, password) {
  let hash = bcrypt.hashSync(password, 5);
  con.connect(function (err) {
    if (err) throw err;
    con.query(
      "INSERT INTO c4pi.empleados(id_departamento,rango,login,password) VALUES(?,?,?,?)",
      [id_departamento, rango, login, hash],
      function (err, result) {
        if (err) throw err;
        console.log(result.affectedRows);
      }
    );
  });
}

function passwordCorrecto(login, password) {
  let respuesta = false;
  con.connect(function (err) {
    if (err) throw err;
    con.query(
      "SELECT password from c4pi.empleados where login=?",
      [login],
      function (err, result) {
        if (err) throw err;
        console.log(result[0].password);
        if (result.length > 0) {
          respuesta = bcrypt.compareSync(password, result[0].password);
        }
      }
    );
  });
  //   bcrypt.compareSync(password);
}
// passwordCorrecto("jorge", "adios");

// getDepartamentos(5);
// console.log(getEmpresas());
// insertaEmpleado(
//   17,
//   1,
//   "11876543X",
//   "Jorge",
//   "Romero",
//   "Gutierrez",
//   "jorge",
//   "hola"
// );
insertaEmpleado(107, 0, "maria", "hola");
