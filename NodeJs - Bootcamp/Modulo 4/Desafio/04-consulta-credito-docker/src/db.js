const Sequelize = require('sequelize')

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: '172.17.0.2',
  port: 5432,
  database: 'consulta_credito',
  username: 'postgres',
  password: 'mysecretpassword',
  logging: false
})

const clienteModel = (sequelize, DataTypes) => {
  const Cliente = sequelize.define('Cliente', {
    CPF: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true
    },
    Nome: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  })

  return Cliente
}

const consultaModel = (sequelize, DataTypes) => {
  const Consulta = sequelize.define('Consulta', {
    Valor: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    NumPrestacoes: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Juros: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    Montante: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    Prestacoes: {
      type: DataTypes.STRING,
      allowNull: false
    }
  })

  return Consulta
}
const produtoModel = (sequelize, DataTypes  ) =>{
  const Produto = sequelize.define('Produto',{
    Codigo:{
      type: DataTypes.STRING,
      allowNull: false
    },
    Descricao:{
      type: DataTypes.STRING,
      allowNull: false
    },
    Valor:{
      type: DataTypes.DOUBLE,
      allowNull: false
    }
  })
  return Produto
}
const cliente = clienteModel(sequelize, Sequelize.DataTypes)
const consulta = consultaModel(sequelize, Sequelize.DataTypes)
const produto = produtoModel(sequelize, Sequelize.DataTypes)

cliente.hasMany(consulta, { as: 'Consultas' })
consulta.belongsTo(cliente)

module.exports = {
  cliente,
  consulta,
  sequelize,
  produto
}
