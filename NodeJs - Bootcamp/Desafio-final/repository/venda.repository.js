const db = require("../model/livraria.models.js");

async function criarVenda(venda) {
  try {
    return await db.vendas.create(venda);
  } catch (err) {
    throw err;
  }
}

async function atualizarVenda(venda) {
  try {
    await db.vendas.update(venda, { where: { vendaId: venda.id } });
    return await buscarVenda(venda.id);
  } catch (err) {
    throw err;
  }
}

async function buscarVenda(id) {
  try {
    return await db.vendas.findByPk(id);
  } catch (err) {
    throw err;
  }
}

async function deletarVenda(id) {
  try {
    await db.vendas.destroy({ where: { vendaId: id } });
  } catch (err) {
    throw err;
  }
}

module.exports = {
  criarVenda,
  atualizarVenda,
  buscarVenda,
  deletarVenda,
};
