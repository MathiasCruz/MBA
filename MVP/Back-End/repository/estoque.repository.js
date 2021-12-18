import produtoRepository from './produto.repository.js'

async function verificarEstoqueDisponivel(pedido) {
    try {
        for (let produto of pedido.produtos) {
            let produtoEstoque = await produtoRepository.buscarProdutoPorId(produto._id);

            if (produtoEstoque.quantidade < produto.qtdReservado) {
                return false
            }

            return true;
        }
    }
    catch (err) {
        throw err;
    }
}

async function atualizarEstoqueProduto(pedido) {

    for (let produto of pedido.produtos) {

        let produtoEstoque = await produtoRepository.buscarProdutoPorId(produto._id);
        produtoEstoque.quantidade = (produtoEstoque.quantidade - produto.qtdReservado);
        await produtoRepository.atualizarProduto(produtoEstoque);

    }
}
export default { verificarEstoqueDisponivel,atualizarEstoqueProduto }