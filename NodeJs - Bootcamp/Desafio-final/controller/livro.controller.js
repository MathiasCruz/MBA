const livroService = require("../service/livro.service.js");
const auth = require("./autorizacao.controller.js");
async function CriaLivro(req, res, next) {
  try {
    if (auth.autenticar(req)) {
      const livro = req.body;
      if (!livro.nome || !livro.valor || !livro.estoque || !livro.autor_id) {
        throw new Error("Nome, Valor,estoque e autor são obrigatóriios");
      }
      res.send(await livroService.CriarLivro(livro));
    } else {
      throw new Error("Criar livro - Não autorizado");
    }
  } catch (err) {
    next(err);
  }
}
async function BuscarLivro(req, res, next) {
  try {
    if (auth.autenticar(req) || await auth.autorizar(req)) {
      const id = req.params.id;
      if (!id) {
        throw new Error("Id é obrigatóriio");
      }
      res.send(await livroService.BuscarLivro(id));
    } else {
      throw new Error("Buscar livro - Não autorizado");
    }
  } catch (err) {
    next(err);
  }
}
async function BuscarTodosLivros(req, res, next) {
  try {
    if (auth.autenticar(req) || await auth.autorizar(req)) {
      if (req.query.autorId) {
        return res.send(
          await livroService.BuscarLivroPorAutor(req.query.autorId)
        );
      }
      res.send(await livroService.BuscarTodosLivros());
    } else {
      throw new Error("Buscar livro - Não autorizado");
    }
  } catch (err) {
    next(err);
  }
}

async function AtualizarLivro(req, res, next) {
  try {
    if (auth.autenticar(req)) {
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
    } else {
      throw new Error("Atualizar livro - Não autorizado");
    }
  } catch (err) {
    next(err);
  }
}

async function DeletarLivro(req, res, next) {
  try {
    if (auth.autenticar(req)) {
      const id = req.params.id;
      if (!id) {
        throw new Error("Id é obrigatóriio");
      }
      res.send(await livroService.DeletarLivro(id));
    } else {
      throw new Error("Deletar livro - Não autorizado");
    }
  } catch (err) {
    next(err);
  }
}
module.exports = {
  CriaLivro,
  AtualizarLivro,
  BuscarLivro,
  DeletarLivro,
  BuscarTodosLivros,
};
