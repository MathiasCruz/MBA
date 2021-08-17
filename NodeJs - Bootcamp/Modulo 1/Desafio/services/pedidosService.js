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

export default {
  registrarPedido,
  atualizarInfoPedidos,
};
