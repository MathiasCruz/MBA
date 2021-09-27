import productRepository from '../repositories/product.repository.js';
import supplierRepository from '../repositories/supplier.repository.js';
import ProductInfoRepository from '../repositories/productInfo.repository.js';

async function createProduct(product) {
  if (await supplierRepository.getSupplier(product.supplier_id)) {
    return await productRepository.insertProduct(product);
  }
  throw new Error('Supplier id informado  Não existe ');
}

async function getProducts() {
  return await productRepository.getProducts();
}

async function getProduct(id) {
  return await productRepository.getProduct(id);
}
async function deleteProduct(id) {
  await productRepository.deleteProduct(id);
}

async function updateProduct(product) {
  if (await supplierRepository.getSupplier(product.supplier_id)) {
    await productRepository.updateProduct(product);
  }
  throw new Error('Supplier id informado Não existe ');
}

async function saveProductInfo(productInfo) {
  await ProductInfoRepository.createProductInfo(productInfo);
}

async function getProductInfo(productId) {
  return await ProductInfoRepository.getProductInfo(productId);
}
async function updateProductInfo(productInfo) {
  await ProductInfoRepository.updateProductInfo(productInfo);
}

async function createReview(review, productId) {
  await ProductInfoRepository.createReview(review, productId);
}
export default {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
  saveProductInfo,
  getProductInfo,
  updateProductInfo,
  createReview,
};
