const clienteRepo = require("../repository/cliente.repository.js");

async function CriarCliente(cliente) {
  return await clienteRepo.criarCliente(cliente);
}

async function AtualizarCliente(cliente) {
  return await clienteRepo.atualizarCliente(cliente);
}

async function BuscarCliente(id) {
  return await clienteRepo.buscarCliente(id);
}

async function DeletarCliente(id) {
  return await clienteRepo.deletarCliente(id);
}
module.exports = {
  CriarCliente,
  AtualizarCliente,
  BuscarCliente,
  DeletarCliente,
};
