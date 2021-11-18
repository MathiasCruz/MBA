import clienteController from '../controller/cliente.controller.js'
import express from 'express'

const router = express.Router();
router.post("/", clienteController.criarCliente);
router.put("/", clienteController.atualizarCliente);
router.get("/:id", clienteController.buscarClientePorId);
router.get("/:telefone", clienteController.buscarClientePorTelefone);
router.get("/", clienteController.buscarTodosClientes);


export default router;