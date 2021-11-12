import repository from '../repository/produto.repository.js'

async function criarProduto(produto) {
    return await repository.criarProduto(produto);
}

async function atualizarProduto(produto) {
    return await repository.atualizarProduto(produto);
}

async function buscarProdutoPorId(id){
    return await repository.buscarProdutoPorId(id);
}

async function buscarTodosProdutos(){
    return await repository.buscarTodosProdutos()
}
export default { criarProduto, atualizarProduto,buscarProdutoPorId,buscarTodosProdutos }