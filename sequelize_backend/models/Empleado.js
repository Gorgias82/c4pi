"use strict";
const database = require("mime-db");
const { Model, UUIDV4 } = require("sequelize");
const { addAbortSignal } = require("stream");
module.exports = (sequelize, DataTypes) => {
  class Empleado extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Empleado.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_departamento: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      rango: {
        type: DataTypes.TINYINT,
        allowNull: false,
      },
      login: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "empleados",
      modelName: "Empleado",
    }
  );
  return Empleado;
};
