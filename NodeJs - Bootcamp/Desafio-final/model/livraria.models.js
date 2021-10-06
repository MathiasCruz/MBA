const Sequelize = require("sequelize");
const sequelize = require("../repository/db.js");

const ClienteModel = (db, Sequelize) => {
  const Clientes = db.define(
    "clientes",
    {
      clienteId: {
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
      senha: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      telefone: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      endereco: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    },
    { underscored: true, timestamps: false }
  );
  return Clientes;
};

const AutoresModel = (db, Sequelize) => {
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
  return Autores;
};

const livrosModel = (db, Sequelize) => {
  const Livros = db.define(
    "livros",
    {
      livroId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      valor: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      estoque: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    },
    { underscored: true, timestamps: false }
  );
  return Livros;
};

const clientes = ClienteModel(sequelize, Sequelize.DataTypes);
const livros = livrosModel(sequelize, Sequelize.DataTypes);
const autores = AutoresModel(sequelize, Sequelize.DataTypes);

const VendasModel = (db, Sequelize) => {
  const Vendas = db.define(
    "vendas",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        unique: true,
      },
      valor: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      data: {
        type: Sequelize.DATEONLY,
      },
      cliente_cliente_id: {
        type: Sequelize.INTEGER,
        unique: false,
      },
      livro_livro_id: {
        type: Sequelize.INTEGER,
        unique: false,
      },
    },
    { underscored: true, timestamps: false }
  );
  return Vendas;
};
const vendas = VendasModel(sequelize, Sequelize.DataTypes);

livros.belongsTo(autores, { foreignKey: "autor_id" });
livros.hasMany(vendas);
vendas.belongsTo(livros);
clientes.hasMany(vendas);
vendas.belongsTo(clientes);

module.exports = { vendas, clientes, livros, vendas, autores };
