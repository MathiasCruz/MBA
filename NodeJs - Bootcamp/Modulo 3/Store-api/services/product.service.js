import productRepository from '../repositories/product.repository.js';
import supplierRepository from '../repositories/supplier.repository.js';

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
export default {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
};
