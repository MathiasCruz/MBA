const Sequelize = require('sequelize')

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: '172.17.0.2',
  port: 5432,
  database: 'store',
  username: 'postgres',
  password: 'mysecretpassword',
  logging: false
})



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
      Preco:{
        type: DataTypes.DOUBLE,
        allowNull: false
      }
    })
    return Produto
  }

const produto = produtoModel(sequelize, Sequelize.DataTypes)

module.exports = {
    sequelize,
    produto
  }
  