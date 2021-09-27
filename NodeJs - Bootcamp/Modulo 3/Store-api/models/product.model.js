import Sequelize from 'sequelize';
import db from '../repositories/db.js';
import Supplier from './supplier.model.js';

const Product = db.define('Products', {
  ProductId: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  value: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  stock: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

Product.belongsTo(Supplier, { foreignKey: 'supplierId' });

export default Product;
