import service from '../services/produto.service.js'

async function criarProduto(req, res, next) {
    try {
        const produto = req.body;
        if (!produto.nome || !produto.quantidade && !produto.peso || !produto.categoria) {

            throw new Error("Nome e quantidade do produto são obrigatórios");
        }

        res.send(await service.criarProduto(produto));
    }
    catch (err) {
        next(err);
    }
}

async function atualizarProduto(req, res, next) {
    try {
        const produto = req.body;
        if (!produto.id || !produto.nome || !produto.quantidade && !produto.peso || !produto.categoria) {

            throw new Error("Nome e quantidade do produto são obrigatórios");

        }

        res.send(await service.atualizarProduto(produto));
    } catch (err) {
        next(err)
    }
}

async function buscarProdutoPorId(req, res, next) {
    try {
        const id = req.params.id;
        if (!id) {
            throw new Error("Id do produto não especificado");
        }
        res.send(await service.buscarProdutoPorId(id));
    }
    catch (err) {
        next(err)
    }
}

export default { criarProduto, atualizarProduto,buscarProdutoPorId }