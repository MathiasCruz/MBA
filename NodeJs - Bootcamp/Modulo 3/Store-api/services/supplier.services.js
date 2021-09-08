import supplierRepository from '../repositories/supplier.repository.js';

async function createSupplier(Supplier) {
  return await supplierRepository.insertSupplier(Supplier);
}

async function getSuppliers() {
  return await supplierRepository.getSuppliers();
}

async function getSupplier(id) {
  return await supplierRepository.getSupplier(id);
}
async function deleteSupplier(id) {
  await supplierRepository.deleteSupplier(id);
}

async function updateSupplier(Supplier) {
  await supplierRepository.updateSupplier(Supplier);
}
export default {
  createSupplier,
  getSuppliers,
  getSupplier,
  deleteSupplier,
  updateSupplier,
};
