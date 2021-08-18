import express from 'express';
import pedidoController from '../controllers/pedidosController.js';
import { promises as fs } from 'fs';

const router = express.Router();

router.post('/', pedidoController.criarPedido);
router.put('/atualizar-pedido', pedidoController.atualizarPedido);
router.put('/atualizar-entrega', pedidoController.atualizarStatusPedido);
router.delete('/:id', pedidoController.deletarPedido);
router.get('/:id', pedidoController.RetornarPedido);
router.get('/total-usuario/:nome', pedidoController.totalPedidosUsuario);
router.get('/total-produto/:produto', pedidoController.totalPedidosProduto);
router.get('/', pedidoController.produtosMaisPedidosDecrescente);
export default router;
