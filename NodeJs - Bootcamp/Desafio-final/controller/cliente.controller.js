const clienteService = require("../service/cliente.service.js");

async function CriaCliente(req, res, next) {
  try {
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
  } catch (err) {
    next(err);
  }
}

async function AtualizarCliente(req, res, next) {
  try {
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
  } catch (err) {
    next(err);
  }
}
module.exports = {
  CriaCliente,
  AtualizarCliente
};
