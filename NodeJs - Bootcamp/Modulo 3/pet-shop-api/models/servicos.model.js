import Sequelize from 'sequelize';
import db from '../repository/db.js';
import Animal from '../models/animais.model.js';
const Servico = db.define(
  'servicos',
  {
    servicoId: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    descricao: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    valor: {
      type: Sequelize.NUMBER,
      allowNull: false,
    },
  },
  { underscored: true, timestamps: false }
);

Servico.belongsTo(Animal, { foreignKey: 'animalId' });

export default Servico;
