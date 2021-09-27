const app = require('./app')
const db = require('./db.js')

db.sequelize.sync().then(async ()=>{
  await console.log('Conectado ao banco de dados')
})

app.listen(5678, () => {
  console.log('Aplicação rodando na porta 5678')
})
//ec3eed499b20 docker container