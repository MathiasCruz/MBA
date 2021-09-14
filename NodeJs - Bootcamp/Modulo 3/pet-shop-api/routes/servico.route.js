import express from 'express';
import servicoController from '../controllers/servico.controller.js';

const router = express.Router();
router.post('/', servicoController.createService);

export default router;
