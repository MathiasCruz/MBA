import produtoController from '../controller/produto.controller.js'
import express from 'express'

const router = express.Router();
router.post("/",produtoController.criarProduto)
router.put("/",produtoController.atualizarProduto)
router.get("/:id",produtoController.buscarProdutoPorId)

export default router;