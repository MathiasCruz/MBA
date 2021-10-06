const livroRepo = require("../repository/livro.repository.js");

async function CriarLivro(livro) {
  return await livroRepo.criarLivro(livro);
}

async function AtualizarLivro(livro) {
  return await livroRepo.atualizarLivro(livro);
}

async function BuscarLivro(id) {
  return await livroRepo.buscarLivro(id);
}
async function BuscarTodosLivros() {
  return await livroRepo.buscarTodosLivros();
}
async function BuscarLivroPorAutor(id){
  return await livroRepo.buscarLivroPorAutor(id)
}
async function DeletarLivro(id) {
  return await livroRepo.deletarLivro(id);
}
module.exports = {
  CriarLivro,
  AtualizarLivro,
  BuscarLivro,
  DeletarLivro,
  BuscarTodosLivros,
  BuscarLivroPorAutor
};
