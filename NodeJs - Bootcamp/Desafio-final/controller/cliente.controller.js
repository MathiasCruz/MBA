const clienteService = require("../service/cliente.service.js");
const auth = require("./autorizacao.controller.js");
async function CriaCliente(req, res, next) {
  try {
    if (auth.autenticar(req)) {
      const cliente = req.body;
      if (
        !cliente.nome ||
        !cliente.email ||
        !cliente.senha ||
        !cliente.telefone ||
        !cliente.endereco
      ) {
        throw new Error(
          "Nome, email, senha, telefone e endereco são obrigatóriios"
        );
      }
      res.send(await clienteService.CriarCliente(cliente));
    } else {
      throw new Error("Criar cliente - Não autorizado");
    }
  } catch (err) {
    next(err);
  }
}

async function BuscarCliente(req, res, next) {
  try {
    const id = req.params.id;
    if (!id) {
      throw new Error("Id é obrigatóriio");
    }
    res.send(await clienteService.BuscarCliente(id));
  } catch (err) {
    next(err);
  }
}
async function AtualizarCliente(req, res, next) {
  try {
    if (auth.autenticar(req)) {
      const cliente = req.body;
      if (
        !cliente.id ||
        !cliente.nome ||
        !cliente.email ||
        !cliente.senha ||
        !cliente.telefone ||
        !cliente.endereco
      ) {
        throw new Error(
          "ID, Nome, email, senha, telefone e endereco são obrigatóriios"
        );
      }
      res.send(await clienteService.AtualizarCliente(cliente));
    } else {
      throw new Error("Atualizar cliente - Não autorizado");
    }
  } catch (err) {
    next(err);
  }
}
async function DeletarCliente(req, res, next) {
  try {
    if (auth.autenticar(req)) {
      const id = req.params.id;
      if (!id) {
        throw new Error("Id é obrigatóriio");
      }
      res.send(await clienteService.DeletarCliente(id));
    } else {
      throw new Error("Deletar cliente - Não autorizado");
    }
  } catch (err) {
    next(err);
  }
}
module.exports = {
  CriaCliente,
  AtualizarCliente,
  BuscarCliente,
  DeletarCliente,
};
