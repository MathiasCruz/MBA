import Sequelize from 'sequelize';

const sequelize = new Sequelize(
  'postgres://mqsbzlab:KJNc3wjX66VhRsMivGHAbQdLhk7aBWgw@chunee.db.elephantsql.com/mqsbzlab',
  {
    dialect: 'postgres',
    define: { timestamp: false },
  }
);

export default sequelize;
