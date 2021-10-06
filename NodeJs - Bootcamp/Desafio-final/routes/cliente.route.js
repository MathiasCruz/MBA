const express = require("express");
const clienteController = require("../controller/cliente.controller.js");
const router = express.Router();
router.get("/:id", clienteController.BuscarCliente);
router.post("/", clienteController.CriaCliente);
router.put("/", clienteController.AtualizarCliente);
router.delete("/:id", clienteController.DeletarCliente);
module.exports = router;
