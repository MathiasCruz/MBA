import produtoRepository from './produto.repository.js'

async function verificarEstoqueDisponivel(pedido) {
    try {
        for (let produto of pedido.produtos) {
            let produtoEstoque = await produtoRepository.buscarProdutoPorId(produto.id_Produto);

            if (produtoEstoque.quantidade < produto.quantidade) {
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

        let produtoEstoque = await produtoRepository.buscarProdutoPorId(produto.id_Produto);
        produtoEstoque.quantidade = (produtoEstoque.quantidade - produto.quantidade);
        await produtoRepository.atualizarProduto(produtoEstoque);

    }
}
export default { verificarEstoqueDisponivel,atualizarEstoqueProduto }