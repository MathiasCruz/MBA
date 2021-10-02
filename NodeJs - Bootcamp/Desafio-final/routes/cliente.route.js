const express = require('express')
const clienteController = require('../controller/cliente.controller.js')

const router = express.Router()
router.post('/',clienteController.CriaCliente)
router.put('/',clienteController.AtualizarCliente)
module.exports = router