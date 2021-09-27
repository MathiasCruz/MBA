import services from '../services/pedidosService.js';

async function criarPedido(req, res, next) {
  try {
    let pedido = req.body;
    if (!pedido.cliente || !pedido.produto || pedido.valor == null) {
      throw new Error('Campos cliente, produtos e valor são obrigatórios');
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
      throw new Error('Enviar campos obrigatórios');
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

async function atualizarStatusPedido(req, res, next) {
  try {
    let pedido = req.body;
    if (!pedido.id && pedido.entregue == null) {
      throw new Error('Enviar campos obrigatórios');
    }
    const pedidoAtualizado = await services.atualizarStatusEntrega(
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
async function deletarPedido(req, res, next) {
  try {
    let pedido = req.params;
    if (!pedido.id) {
      throw new Error('Enviar campos obrigatórios: id');
    }
    const retorno = await services.excluirPedido(req, res, next);
    res.send(retorno);
  } catch (err) {
    logarErro(err);
    res.end();
  }
}
async function RetornarPedido(req, res, next) {
  try {
    let pedido = req.params;
    if (!pedido.id) {
      throw new Error('Enviar campos obrigatórios: id');
    }
    const retorno = await services.buscaPedido(req, res, next);
    res.send(retorno);
  } catch (err) {
    logarErro(err);
    res.end();
  }
}

async function totalPedidosUsuario(req, res, next) {
  try {
    let param = req.params;
    if (!param.nome) {
      throw new Error('Enviar campos obrigatórios: nome');
    }
    const total = await services.calculaTotalUsuario(req, res, next);
    res.send(JSON.stringify(total));
  } catch (err) {
    logarErro(err);
    res.end();
  }
}
async function totalPedidosProduto(req, res, next) {
  try {
    let param = req.params;
    if (!param.produto) {
      throw new Error('Enviar campos obrigatórios: produto');
    }
    const produto = await services.calculaTotalProduto(req, res, next);
    res.send(JSON.stringify(produto));
  } catch (err) {
    logarErro(err);
    res.end();
  }
}

async function produtosMaisPedidosDecrescente(req, res, next) {
  try {
    console.log('chegou aqui');
    const produtos = await services.produtosMaisPedidos(req, res, next);
    res.send(JSON.stringify(produtos));
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
  atualizarStatusPedido,
  deletarPedido,
  RetornarPedido,
  totalPedidosUsuario,
  totalPedidosProduto,
  produtosMaisPedidosDecrescente,
};
