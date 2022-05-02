const express = require("express");

const { sequelize, Empleado, Hotel, Departamento } = require("./models");

const app = express();

var bcrypt = require("bcrypt");
const hotel = require("./models/hotel");
const { json } = require("body-parser");

app.use(express.json());

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

app.get("/hoteles", async (req, res) => {
  try {
    const hoteles = await Hotel.findAll({ order: [["nombre", "ASC"]] });
    return res.json(hoteles);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ error: "No se ha podido obtener la lista de hoteles" });
  }
});

app.post("/departamentos", async (req, res) => {
  const id_hotel = req.body.envio;
  try {
    const departamentos = await Departamento.findAll({
      where: { id_hotel },
      order: [["nombre", "ASC"]],
    });
    return res.json(departamentos);
  } catch (err) {
    return res
      .status(500)
      .json({ error: "No se ha podido obtener la lista de departamentos" });
  }
});

app.post("/comprobacion_nombre", async (req, res) => {
  try {
    const login = req.body.envio;
    const empleado = await Empleado.findOne({ where: { login } });
    console.log(empleado);
    if (empleado == null) {
      return res.json(false);
    } else {
      return res.json(true);
    }
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ error: "No se ha podido realizar la comprobacion" });
  }
});
app.post("/comprobacion_password", async (req, res) => {
  const login = req.body.nombre;
  var password = req.body.password;
  try {
    const empleado = await Empleado.findOne({ where: { login } });
    if (empleado == null) {
    } else {
      let respuesta = bcrypt.compareSync(password, empleado.password);
      if (respuesta) {
        return res.json(true);
      }
    }
    return res.json(false);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ error: "No se ha podido realizar la comprobacion" });
  }
});

app.post("/insercion_empleado", async (req, res) => {
  try {
    var { id_departamento, login, password } = req.body;
    password = bcrypt.hashSync(password, 5);

    const attributes = {
      fields: ["id_departamento", "login", "password"],
      silent: true,
    };
    await Empleado.create(
      {
        id_departamento,
        login,
        password,
      },
      attributes
    );
    const respuesta = true;
    return res.json(respuesta);
  } catch (err) {
    const respuesta = false;
    console.log(err);
    return res.json(respuesta);
  }
});

app.listen({ port: 3000 }, async () => {
  console.log("Server up on http://localhost:3000");
  try {
    // await sequelize.sync();
    await sequelize.authenticate();
  } catch (err) {
    console.log("error de sync : " + err);
  }

  console.log("Database connect");
});
