import repository from '../repository/pedido.repository.js'

async function criarPedido(pedido) {
    return await repository.criarPedido(pedido);
}

export default { criarPedido }