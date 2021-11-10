import repository from '../repository/produto.repository.js'

async function criarProduto(produto){
    return await repository.criarProduto();
}

export default {criarProduto}