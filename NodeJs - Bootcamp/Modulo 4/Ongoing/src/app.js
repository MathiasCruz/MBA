const express = require('express')

const app = express()
const db = require('./db.js')
app.get('/', async (req, res) => {
  res.status(200).send('Bootcamp desenvolvedor backend - topicos especiais')
})

module.exports = app
