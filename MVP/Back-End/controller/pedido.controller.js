import service from '../services/pedido.service.js'
import estoqueService from '../services/estoque.service.js'

async function criarPedido(req, res, next) {
    try {
        const pedido = req.body;
        const haEstoque = await estoqueService.verificarEstoqueDisponivel(pedido);
        if (!haEstoque) {
            throw new Error("Não há estoque disponível")
        }
        await estoqueService.atualizarEstoqueProduto(pedido);
        res.send(await service.criarPedido(pedido));
    }
    catch (err) {
        next(err);
    }
}

export default {criarPedido}
