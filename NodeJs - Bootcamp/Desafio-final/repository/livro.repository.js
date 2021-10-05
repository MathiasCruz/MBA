const db = require("../model/livraria.models.js");

async function criarLivro(livro) {
  try {
    return await db.livros.create(livro);
  } catch (err) {
    throw err;
  }
}

async function atualizarLivro(livro) {
  try {
    await db.livros.update(livro, { where: { livroId: livro.id } });
    return await buscarLivro(livro.id);
  } catch (err) {
    throw err;
  }
}

async function buscarLivro(id) {
  try {
    return await db.livros.findByPk(id);
  } catch (err) {
    throw err;
  }
}

async function deletarLivro(id) {
  try {
    await db.livros.destroy({ where: { livroId: id } });
  } catch (err) {
    throw err;
  }
}

module.exports = {
  criarLivro,
  atualizarLivro,
  buscarLivro,
  deletarLivro,
};
