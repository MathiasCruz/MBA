import Sequelize from 'sequelize';

const sequelize = new Sequelize(
  'postgres://izzrgthd:7hBogXLmz4RGcdlREgI2oL5y-S06VWgV@kesavan.db.elephantsql.com/izzrgthd',
  {
    dialect: 'postgres',
    define: { timestamp: false },
  }
);

export default sequelize;
