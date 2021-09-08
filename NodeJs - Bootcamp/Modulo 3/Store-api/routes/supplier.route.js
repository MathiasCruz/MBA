import express, { Router } from 'express';
import supplierController from '../controllers/supplier.controller.js';

const router = express.Router();
router.post('/', supplierController.createClient);
router.get('/', supplierController.getClients);
router.get('/:id', supplierController.getClient);
router.delete('/:id', supplierController.deleteClient);
router.put('/', supplierController.updateClient);
export default router;
