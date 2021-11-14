import estoqueRepository from "../repository/estoque.repository.js";

async function verificarEstoqueDisponivel(pedido) {
    return await estoqueRepository.verificarEstoqueDisponivel(pedido);
}

async function atualizarEstoqueProduto(pedido) {
    return await estoqueRepository.atualizarEstoqueProduto(pedido);
}

export default { verificarEstoqueDisponivel, atualizarEstoqueProduto }