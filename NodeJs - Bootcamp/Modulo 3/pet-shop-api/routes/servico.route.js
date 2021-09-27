import express from 'express';
import servicoController from '../controllers/servico.controller.js';

const router = express.Router();
router.post('/', servicoController.createService);
router.get('/', servicoController.getServices);
export default router;
