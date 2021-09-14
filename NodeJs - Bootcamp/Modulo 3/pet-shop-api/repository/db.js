import Sequelize from 'sequelize';

const sequelize = new Sequelize(
  'postgres://dakjqsxs:3olo7t3R12cKAz4UYUE8b_5QJPhHQ1Mi@kesavan.db.elephantsql.com/dakjqsxs',
  {
    dialect: 'postgres',
    define: { timestamp: false },
  }
);

export default sequelize;
