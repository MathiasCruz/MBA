const vendaService = require("../service/venda.service.js");
const clienteService = require("../service/cliente.service.js");
const auth = require("./autorizacao.controller.js");
async function CriaVenda(req, res, next) {
  try {
    if (auth.autenticar(req) || (await auth.autorizar(req))) {
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
    if (auth.autenticar(req)) {
      const id = req.params.id;
      if (!id) {
        throw new Error("Id é obrigatóriio");
      }
    } else {
      throw new Error("Criar venda não autorizado");
    }
    res.send(await vendaService.DeletarVenda(id));
  } catch (err) {
    next(err);
  }
}

async function buscarTodasVendas(req, res, next) {
  try {
    const id = req.query.clienteId;
    const idLivro = req.query.livroId;
    if (id) {
      if (auth.autenticar(req) || await auth.autorizar(req)) {
        return res.send(await vendaService.buscarVendaByCliente(id));
      } else {
        throw new Error(
          "Cliente não autorizado a ver compras de outros usuarios"
        );
      }
    } else if (idLivro) {
      return res.send(await vendaService.buscarVendaByLivro(idLivro));
    }
    res.send(await vendaService.buscarTodasVendas());
  } catch (err) {
    next(err);
  }
}
module.exports = {
  CriaVenda,
  AtualizarVenda,
  BuscarVenda,
  DeletarVenda,
  buscarTodasVendas,
};
