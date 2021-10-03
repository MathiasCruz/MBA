const Cliente = require("../model/cliente.model.js");

async function criarCliente(cliente) {
  try {
    return await Cliente.create(cliente);
  } catch (err) {
    throw err;
  }
}

async function atualizarCliente(cliente) {
  try {
    await Cliente.update(cliente, { where: { clienteId: cliente.id } });
    return await buscarCliente(cliente.id);
  } catch (err) {
    throw err;
  }
}

async function buscarCliente(id) {
  try {
    return await Cliente.findByPk(id);
  } catch (err) {
    throw err;
  }
}

async function deletarCliente(id) {
  try {
    await Cliente.destroy({ where: { clienteId: id } });
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
