import Sequelize from 'sequelize';
import db from '../repository/db.js';

const Proprietario = db.define(
  'proprietarios',
  {
    proprietarioId: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    nome: {
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

export default Proprietario;