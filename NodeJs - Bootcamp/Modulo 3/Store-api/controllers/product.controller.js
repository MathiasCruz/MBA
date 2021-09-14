import productService from '../services/product.service.js';
async function createProduct(req, res, next) {
  try {
    let product = req.body;
    if (
      !product.nome ||
      !product.description ||
      !product.value ||
      !product.stock ||
      !product.supplier_id
    ) {
      throw new Error(
        'Nome, cnpj, description, value, stock e supplier_id são obrigatórios'
      );
    }
    res.send(await productService.createProduct(product));
    global.logger.info(`Post/product - ${JSON.stringify(product)}`);
  } catch (err) {
    next(err);
  }
}

async function getProducts(req, res, next) {
  try {
    res.send(await productService.getProducts());
    global.logger.info(`GET/products`);
  } catch (err) {
    next(err);
  }
}

async function getProduct(req, res, next) {
  try {
    res.send(await productService.getProduct(req.params.id));
    global.logger(`GET/ CLIENT `);
  } catch (err) {
    next(err);
  }
}
async function deleteProduct(req, res, next) {
  try {
    res.end(await productService.deleteProduct(req.params.id));
    global.logger(`DELETE/ product `);
  } catch (err) {
    next(err);
  }
}
async function updateProduct(req, res, next) {
  try {
    let product = req.body;
    if (
      !product.product_id ||
      !product.nome ||
      !product.description ||
      !product.value ||
      !product.stock ||
      !product.supplier_id
    ) {
      throw new Error(
        'Product ID, Nome, cnpj, description, value, stock e supplier_id são obrigatórios'
      );
    }
    let updated = res.send(await productService.updateProduct(product));
    global.logger.info(`PUT/product - ${JSON.stringify(updated)}`);
  } catch (err) {
    next(err);
  }
}

async function createProductInfo(req, res, next) {
  try {
    let productInfo = req.body;
    if (!productInfo.productId) {
      throw new Error('Product ID é obrigatório');
    }
    await productService.saveProductInfo(productInfo);
    res.end();
    global.logger.info(`POST/product/info - ${JSON.stringify(productInfo)}`);
  } catch (err) {
    next(err);
  }
}

async function getProductInfo(req, res, next) {
  try {
    res.send(await productService.getProductInfo(parseInt(req.params.id)));
    global.logger.info(`GET/product/info `);
  } catch (err) {
    next(err);
  }
}

async function updateProductInfo(req, res, next) {
  try {
    let productInfo = req.body;
    if (!productInfo.productId) {
      throw new Error('Product ID é obrigatório');
    }
    res.send(await productService.updateProductInfo(parseInt(productInfo)));
    global.logger.info(`PUT /product/info `);
  } catch (err) {
    next(err);
  }
}

async function createReview(req, res, next) {
  try {
    let productInfo = req.body;
    if (!productInfo.review || !productInfo.productId) {
      throw new Error('Product ID e review sao obrigatórios');
    }
    await productService.createReview(
      productInfo.review,
      parseInt(productInfo.productId)
    );
    res.end();
    global.logger.info(`POST /product/Review `);
  } catch (err) {
    next(err);
  }
}
export default {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
  createProductInfo,
  getProductInfo,
  updateProductInfo,
  createReview,
};
