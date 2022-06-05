require("dotenv").config();
// const port = process.env.PORT || 3000;
// app.set("port", port);
// const server = http.createServer(app);
var mysql = require("mysql");
const con = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

module.exports = con;
