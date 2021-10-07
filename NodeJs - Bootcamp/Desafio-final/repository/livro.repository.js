const db = require("../model/livraria.models.js");
const infoRepository = require("./info.livro.repository.js");
const vendaService = require("../service/venda.service.js");
async function criarLivro(livro) {
  try {
    return await db.livros.create(livro);
  } catch (err) {
    throw err;
  }
}

async function atualizarLivro(livro) {
  try {
    await db.livros.update(livro, { where: { livroId: livro.livroId } });
    return await buscarLivro(livro.livroId);
  } catch (err) {
    throw err;
  }
}

async function buscarLivro(id) {
  try {
    const livro = await db.livros.findByPk(id, { raw: true });
    const informacoes = await infoRepository.buscarInfo(id);
    const retorno = Object.assign(livro, informacoes);
    return retorno;
  } catch (err) {
    throw err;
  }
}

async function buscarLivro2(id) {
  try {
    const livro = await db.livros.findByPk(id, { raw: true });
    const informacoes = await infoRepository.buscarInfo(id);
    const retorno = Object.assign(livro, informacoes);
    return retorno;
  } catch (err) {
    throw err;
  }
}

async function buscarTodosLivros() {
  try {
    return await db.livros.findAll();
  } catch (err) {
    throw err;
  }
}
async function buscarLivroPorAutor(id) {
  try {
    return await db.livros.findAll({ where: { autor_id: id } });
  } catch (err) {
    throw err;
  }
}

async function deletarLivro(id) {
  try {
    const vendas = await vendaService.buscarVendaByLivro(id);
    if (vendas) {
      throw new Error("Não foi possivel deletar - Há vendas deste livro ");
    }
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
  buscarTodosLivros,
  buscarLivroPorAutor,
  buscarLivro2
};
