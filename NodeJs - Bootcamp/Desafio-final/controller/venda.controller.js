const vendaService = require("../service/venda.service.js");
const auth = require("./autorizacao.controller.js");
async function CriaVenda(req, res, next) {
  try {
    if (auth.autenticar(req) || auth.autorizar(req)) {
      const venda = req.body;
      if (
        !venda.valor ||
        !venda.data ||
        !venda.cliente_cliente_id ||
        !venda.livro_livro_id
      ) {
        throw new Error("Valor,data, cliente e livro são obrigatóriios");
      }
      res.send(await vendaService.CriarVenda(venda));
    } else {
      throw new Error("Criar venda não autorizado");
    }
  } catch (err) {
    next(err);
  }
}
async function BuscarVenda(req, res, next) {
  try {
    const id = req.params.id;
    if (!id) {
      throw new Error("Id é obrigatóriio");
    }
    res.send(await vendaService.BuscarVenda(id));
  } catch (err) {
    next(err);
  }
}
async function AtualizarVenda(req, res, next) {
  try {
    const venda = req.body;
    if (
      !venda.id ||
      !venda.valor ||
      !venda.data ||
      !venda.cliente_id ||
      !venda.livro_id
    ) {
      throw new Error("Valor,data, cliente e livro são obrigatóriios");
    }
    res.send(await vendaService.AtualizarVenda(venda));
  } catch (err) {
    next(err);
  }
}
async function DeletarVenda(req, res, next) {
  try {
    const id = req.params.id;
    if (!id) {
      throw new Error("Id é obrigatóriio");
    }
    res.send(await vendaService.DeletarVenda(id));
  } catch (err) {
    next(err);
  }
}
module.exports = {
  CriaVenda,
  AtualizarVenda,
  BuscarVenda,
  DeletarVenda,
};
