const vendaRepo = require("../repository/venda.repository.js");

async function CriarVenda(venda) {
  return await vendaRepo.criarVenda(venda);
}

async function AtualizarVenda(venda) {
  return await vendaRepo.atualizarVenda(venda);
}

async function BuscarVenda(id) {
  return await vendaRepo.buscarVenda(id);
}

async function DeletarVenda(id) {
  return await vendaRepo.deletarVenda(id);
}
module.exports = {
  CriarVenda,
  AtualizarVenda,
  BuscarVenda,
  DeletarVenda,
};
