const autorRepo = require("../repository/autor.repository.js");

async function CriarAutor(autor) {
  return await autorRepo.criarAutor(autor);
}

async function AtualizarAutor(autor) {
  return await autorRepo.atualizarAutor(autor);
}

async function BuscarAutor(id) {
  return await autorRepo.buscarAutor(id);
}

async function DeletarAutor(id) {
  return await autorRepo.deletarAutor(id);
}
module.exports = {
  CriarAutor,
  AtualizarAutor,
  BuscarAutor,
  DeletarAutor,
};
