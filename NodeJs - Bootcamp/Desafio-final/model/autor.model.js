const Sequelize = require("sequelize");
const db = require("../repository/db.js");

const Autores = db.define(
  "autores",
  {
    autorId: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    nome: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    telefone: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  { underscored: true, timestamps: false }
);
module.exports = Autores;
