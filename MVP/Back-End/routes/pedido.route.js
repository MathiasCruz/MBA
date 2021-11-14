import pedidoController from '../controller/pedido.controller.js'
import express from 'express'

const router = express.Router();
router.post('/', pedidoController.criarPedido);

export default router;

