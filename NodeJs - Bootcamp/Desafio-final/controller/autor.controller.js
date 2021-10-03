const autorService = require("../service/autor.service.js");

async function CriaAutor(req, res, next) {
  try {
    const autor = req.body;
    if (!autor.nome || !autor.email || !autor.telefone) {
      throw new Error("Nome, email,telefone são obrigatóriios");
    }
    res.send(await autorService.CriarAutor(autor));
  } catch (err) {
    next(err);
  }
}
async function BuscarAutor(req, res, next) {
  try {
    const id = req.params.id;
    if (!id) {
      throw new Error("Id é obrigatóriio");
    }
    res.send(await autorService.BuscarAutor(id));
  } catch (err) {
    next(err);
  }
}
async function AtualizarAutor(req, res, next) {
  try {
    const autor = req.body;
    if (!autor.nome || !autor.email || !autor.telefone) {
      throw new Error("Nome, email,telefone são obrigatóriios");
    }
    res.send(await autorService.AtualizarAutor(autor));
  } catch (err) {
    next(err);
  }
}
async function DeletarAutor(req, res, next) {
  try {
    const id = req.params.id;
    if (!id) {
      throw new Error("Id é obrigatóriio");
    }
    res.send(await autorService.DeletarAutor(id));
  } catch (err) {
    next(err);
  }
}
module.exports = {
  CriaAutor,
  AtualizarAutor,
  BuscarAutor,
  DeletarAutor,
};
