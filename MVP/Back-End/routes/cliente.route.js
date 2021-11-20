import clienteController from '../controller/cliente.controller.js'
import express from 'express'

const router = express.Router();
router.post("/", clienteController.criarCliente);
router.put("/", clienteController.atualizarCliente);
router.get("/", clienteController.buscarCliente);

export default router;