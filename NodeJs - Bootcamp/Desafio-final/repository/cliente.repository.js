const db = require("../model/livraria.models.js");

async function criarCliente(cliente) {
  try {
    return await db.clientes.create(cliente);
  } catch (err) {
    throw err;
  }
}

async function atualizarCliente(cliente) {
  try {
    await db.clientes.update(cliente, { where: { clienteId: cliente.id } });
    return await buscarCliente(cliente.id);
  } catch (err) {
    throw err;
  }
}

async function buscarCliente(id) {
  try {
    return await db.clientes.findByPk(id);
  } catch (err) {
    throw err;
  }
}

async function deletarCliente(id) {
  try {
    await db.clientes.destroy({ where: { clienteId: id } });
  } catch (err) {
    throw err;
  }
}

module.exports = {
  criarCliente,
  atualizarCliente,
  buscarCliente,
  deletarCliente,
};
