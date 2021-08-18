import { error } from 'console';
import { promises as fs } from 'fs';
const { readFile, writeFile } = fs;

async function registrarPedido(pedido) {
  try {
    const pedidoParam = pedido;
    let hrPedido = new Date();
    const data = JSON.parse(await readFile(global.filename));
    data.nextId++;
    const novoPedido = {
      id: data.nextId,
      cliente: pedidoParam.cliente,
      produto: pedidoParam.produto,
      valor: pedidoParam.valor,
      entregue: false,
      timestamp: hrPedido,
    };
    data.pedidos.push(novoPedido);
    await writeFile(global.filename, JSON.stringify(data));
    return novoPedido;
  } catch (err) {
    console.log('Erro ao gravar :' + err);
  }
}

async function atualizarInfoPedidos(req, res, next) {
  try {
    let pedido = req.body;
    const data = JSON.parse(await readFile(global.filename));
    const index = data.pedidos.findIndex(item => item.id === pedido.id);
    if (index === -1) {
      throw new error('Dados não encontrados');
    }
    data.pedidos[index].cliente = pedido.cliente;
    data.pedidos[index].produto = pedido.produto;
    data.pedidos[index].valor = pedido.valor;
    await writeFile(global.filename, JSON.stringify(data, null, 2));
    return pedido;
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
  }
}

async function atualizarStatusEntrega(req, res, next) {
  try {
    let pedido = req.body;
    const data = JSON.parse(await readFile(global.filename));
    const index = data.pedidos.findIndex(item => item.id === pedido.id);
    if (index === -1) {
      throw new error('Dados não encontrados');
    }
    data.pedidos[index].entregue = pedido.entregue;
    await writeFile(global.filename, JSON.stringify(data, null, 2));
    return pedido;
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
  }
}

async function excluirPedido(req, res, next) {
  try {
    const data = JSON.parse(await readFile(global.filename));

    data.pedidos = data.pedidos.filter(
      pedidos => pedidos.id !== parseInt(req.params.id)
    );
    await writeFile(global.filename, JSON.stringify(data, null, 2));
    return 'Pedido excluido';
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
  }
}

async function buscaPedido(req, res, next) {
  try {
    const data = JSON.parse(await readFile(global.filename));
    const pedido = data.pedidos.filter(
      pedidos => pedidos.id === parseInt(req.params.id)
    );
    return pedido;
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
  }
}
async function calculaTotalUsuario(req, res, next) {
  try {
    const data = JSON.parse(await readFile(global.filename));
    const pedidosFiltrados = data.pedidos.filter(
      pedidos =>
        pedidos.cliente != null &&
        pedidos.cliente.trim().toUpperCase() ===
          req.params.nome.trim().toUpperCase() &&
        pedidos.entregue === true
    );
    const total = pedidosFiltrados.reduce(
      (total, item) => total + item.valor,
      0
    );
    return total;
  } catch (err) {
    res.sendStatus(500).send(err);
    console.log(err);
  }
}

async function calculaTotalProduto(req, res, next) {
  try {
    const data = JSON.parse(await readFile(global.filename));
    const pedidosFiltrados = data.pedidos.filter(
      pedidos =>
        pedidos.produto != null &&
        pedidos.produto.trim().toUpperCase() ===
          req.params.produto.trim().toUpperCase() &&
        pedidos.entregue === true
    );
    if (pedidosFiltrados.length === 0) {
      throw new Error('Esse produto não existe');
    }
    const total = pedidosFiltrados.reduce(
      (total, item) => total + item.valor,
      0
    );

    return { produto: req.params.produto, total: total };
  } catch (err) {
    res.sendStatus(500).send(err);
    console.log(err);
  }
}

async function produtosMaisPedidos(req, res, next) {
  try {
    const data = JSON.parse(await readFile(global.filename));
    let pedidos = [];
    let index = 0;
    for (let item of data.pedidos) {
      if (pedidos.length === 0) {
        if (item.entregue === true) {
          pedidos.push({ produto: item.produto, quantidade: 1 });
        }
      } else {
        index = pedidos.findIndex(
          pedido =>
            pedido.produto.trim().toUpperCase() ===
              item.produto.trim().toUpperCase() && item.entregue === true
        );
        if (index != -1) {
          pedidos[index].quantidade++;
        } else {
          pedidos.push({ produto: item.produto, quantidade: 1 });
        }
      }
    }

    return pedidos.sort((a, b) => b.quantidade - a.quantidade);
  } catch (err) {
    res.sendStatus(500).send(err);
    console.log(err);
  }
}
export default {
  registrarPedido,
  atualizarInfoPedidos,
  atualizarStatusEntrega,
  excluirPedido,
  buscaPedido,
  calculaTotalUsuario,
  calculaTotalProduto,
  produtosMaisPedidos,
};
