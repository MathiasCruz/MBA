import Sequelize from 'sequelize';
import db from '../repository/db.js';
import Proprietario from './proprietario.model.js';

const Animais = db.define(
  'animais',
  {
    animalId: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    nome: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    tipo: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  { underscored: true, timestamps: false }
);

Animais.belongsTo(Proprietario, { foreignKey: 'proprietarioId' });

export default Animais;
