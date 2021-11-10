import produtoController from '../controller/produto.controller.js'
import express from 'express'

const router = express.Router();
router.post("/",produtoController.criarProduto)

export default router;