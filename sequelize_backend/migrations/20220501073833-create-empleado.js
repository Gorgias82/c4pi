"use strict";
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("empleados", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      id: {
        type: DataTypes.STRING,
      },
      id_departamento: {
        type: DataTypes.STRING,
      },
      rango: {
        type: DataTypes.TINYINT,
      },
      login: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("empleados");
  },
};
