const app = require('./index.js')
const db = require('./repository/db.js')

app.listen(3000,()=>console.log('Api iniciada na porta 3000'))

db.sync({force: true}).then(async () => {
    await console.log('Conectado ao banco de dados!')
  })
// db.connect().then (async () => {
//     console.log('Conectado ao banco de dados na porta 49153')
// }).finally(async ()=>)
