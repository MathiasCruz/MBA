import express from 'express';
import pedidoController from '../controllers/pedidosController.js';
import { promises as fs } from 'fs';

const router = express.Router();

router.post('/', pedidoController.criarPedido);
router.put('/atualizar-pedido', pedidoController.atualizarPedido);

export default router;
