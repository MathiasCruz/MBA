import services from '../services/pedidosService.js';

async function criarPedido(req, res, next) {
  try {
    let pedido = req.body;
    if (!pedido.cliente || !pedido.produto || pedido.valor == null) {
      throw new error('Campos cliente, produtos e valor são obrigatórios');
    }
    const novoPedido = await services.registrarPedido(pedido);
    res.send(pedido);
  } catch (err) {
    logarErro(err);
    res.end();
  }
}

async function atualizarPedido(req, res, next) {
  try {
    let pedido = req.body;
    if (
      (!pedido.cliente && !pedido.produto) ||
      !pedido.id ||
      pedido.valor == null
    ) {
      throw new error('Enviar campos obrigatórios');
    }
    const pedidoAtualizado = await services.atualizarInfoPedidos(
      req,
      res,
      next
    );
    res.send(pedidoAtualizado);
  } catch (err) {
    logarErro(err);
    res.end();
  }
}

function logarErro(err) {
  console.log(err);
}
export default {
  criarPedido,
  atualizarPedido,
};
