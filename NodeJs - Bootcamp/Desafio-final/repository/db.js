const {Pool,Client} = require('pg')

const pool = new Client({
    user:"postgres",
    host: "localhost",
    database:"livraria",
    password:"mysecretpassword",
    port:49153
})

module.exports = pool