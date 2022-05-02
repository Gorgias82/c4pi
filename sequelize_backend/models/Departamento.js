"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Departamento extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
      // this.belongsTo(Hotel, { foreignKey: id_hotel });
    }
  }
  Departamento.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      id_hotel: {
        type: DataTypes.INTEGER,
        // foreignKey: true,
      },
    },
    {
      sequelize,
      tableName: "departamentos",
      modelName: "Departamento",
    }
  );
  return Departamento;
};
