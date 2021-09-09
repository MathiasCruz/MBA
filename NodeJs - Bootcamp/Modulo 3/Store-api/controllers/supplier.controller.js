import supplierService from '../services/supplier.services.js';
async function createSupplier(req, res, next) {
  try {
    let supplier = req.body;
    if (
      !supplier.name ||
      !supplier.cnpj ||
      !supplier.phone ||
      !supplier.email ||
      !supplier.address
    ) {
      throw new Error('Name, cnpj, phone, email, address são obrigatórios');
    }
    res.send(await supplierService.createSupplier(supplier));
    global.logger.info(`Post/supplier - ${JSON.stringify(supplier)}`);
  } catch (err) {
    next(err);
  }
}

async function getSuppliers(req, res, next) {
  try {
    res.send(await supplierService.getSuppliers());
    global.logger.info(`GET/suppliers`);
  } catch (err) {
    next(err);
  }
}

async function getSupplier(req, res, next) {
  try {
    res.send(await supplierService.getSupplier(req.params.id));
    global.logger(`GET/ Supplier `);
  } catch (err) {
    next(err);
  }
}
async function deleteSupplier(req, res, next) {
  try {
    res.end(await supplierService.deleteSupplier(req.params.id));
    global.logger(`DELETE/ supplier `);
  } catch (err) {
    next(err);
  }
}
async function updateSupplier(req, res, next) {
  try {
    let supplier = req.body;
    if (
      !supplier.supplier_id ||
      !supplier.name ||
      !supplier.cnpj ||
      !supplier.phone ||
      !supplier.email ||
      !supplier.address
    ) {
      throw new Error('ID,Name, cnpj, phone, email, address são obrigatórios');
    }
    let updated = res.send(await supplierService.updateSupplier(supplier));
    global.logger.info(`PUT/supplier - ${JSON.stringify(updated)}`);
  } catch (err) {
    next(err);
  }
}

export default {
  createSupplier,
  getSuppliers,
  getSupplier,
  deleteSupplier,
  updateSupplier,
};
