import express, { Router } from 'express';
import productController from '../controllers/product.controller.js';

const router = express.Router();
router.post('/', productController.createProduct);
router.get('/', productController.getProducts);
router.get('/:id', productController.getProduct);
router.delete('/:id', productController.deleteProduct);
router.put('/', productController.updateProduct);
router.post('/info', productController.createProductInfo);
router.get('/info/:id', productController.getProductInfo);
router.put('/info', productController.updateProductInfo);
router.post('info/review', productController.createReview);
export default router;
