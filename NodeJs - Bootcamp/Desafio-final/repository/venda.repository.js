const db = require("../model/livraria.models.js");
const livros = require("./livro.repository.js");

async function criarVenda(venda) {
  try {
    const livro = await livros.buscarLivro(venda.livro_livro_id);
    if (livro.estoque > 0) {
      livro.estoque--;
      await livros.atualizarLivro(livro);
    } else {
      throw new Error("Livro sem estoque para venda");
    }
    return await db.vendas.create(venda);
  } catch (err) {
    throw err.message;
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

async function buscarTodasVendas() {
  try {
    return await db.vendas.findAll();
  } catch (err) {
    throw err;
  }
}

async function buscarVendaByCliente(id) {
  try {
    return await db.vendas.findAll({
      where: { cliente_cliente_id: id },
      raw: true,
    });
  } catch (err) {
    throw err;
  }
}

async function buscarVendaByLivro(id) {
  try {
    return await db.vendas.findAll({
      where: { livro_livro_id: id },
      raw: true,
    });
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
  buscarTodasVendas,
  buscarVendaByCliente,
  buscarVendaByLivro,
};
