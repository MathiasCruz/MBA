import service from '../services/produto.service.js'

async function criarProduto(req,res,next){
    try{
        const produto = req.body;
        if(!produto.nome || !produto.quantidade){
            throw new Error("Nome e quantidade do produto são obrigatórios");
        }
        res.send( await service.criarProduto(produto));
    }
    catch(err){
        next(err);
    }
}

export default {criarProduto}