const livroService = require("../service/livro.service.js");

async function CriaLivro(req, res, next) {
  try {
    const livro = req.body;
    if (!livro.nome || !livro.valor || !livro.estoque || !livro.autor_id) {
      throw new Error("Nome, Valor,estoque e autor são obrigatóriios");
    }
    res.send(await livroService.CriarLivro(livro));
  } catch (err) {
    next(err);
  }
}
async function BuscarLivro(req, res, next) {
  try {
    const id = req.params.id;
    if (!id) {
      throw new Error("Id é obrigatóriio");
    }
    res.send(await livroService.BuscarLivro(id));
  } catch (err) {
    next(err);
  }
}
async function AtualizarLivro(req, res, next) {
  try {
    const livro = req.body;
    if (
      !livro.nome ||
      !livro.valor ||
      !livro.estoque ||
      !livro.autorId ||
      livro.id
    ) {
      throw new Error(
        "Nome, Valor,estoque, autor e id livro são obrigatóriios"
      );
    }
    res.send(await livroService.AtualizarLivro(livro));
  } catch (err) {
    next(err);
  }
}
async function DeletarLivro(req, res, next) {
  try {
    const id = req.params.id;
    if (!id) {
      throw new Error("Id é obrigatóriio");
    }
    res.send(await livroService.DeletarLivro(id));
  } catch (err) {
    next(err);
  }
}
module.exports = {
  CriaLivro,
  AtualizarLivro,
  BuscarLivro,
  DeletarLivro,
};
