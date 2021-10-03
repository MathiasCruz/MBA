const Sequelize = require("sequelize");

const sequelize = new Sequelize({
  dialect: "postgres",
  host: "172.17.0.2",
  port: 5432,
  database: "livraria",
  username: "postgres",
  password: "mysecretpassword",
  logging: false,
  define: { timestamp: false },
});

module.exports = sequelize;
