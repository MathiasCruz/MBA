import mongo from './mongodb.js'
import { ObjectId } from 'mongodb'

async function criarProduto(produto) {
    const conexao = await mongo.retornarConexao();
    try {
        await conexao.db('Controle-Estoque').collection('Produtos').insertOne(produto)
    }
    catch (ex) {
        throw ex;
    }
    finally {
        await mongo.fecharConexao(conexao);
    }
}

async function atualizarProduto(produto) {
    const conexao = await mongo.retornarConexao();
    try {
        let objectId = new ObjectId(produto._id);
        await conexao.db('Controle-Estoque').collection('Produtos').updateOne({ _id: objectId }, { $set: { ...produto } });
    }
    catch (ex) {
        throw ex;
    }
    finally {
        await mongo.fecharConexao(conexao);
    }
}

async function buscarProdutoPorId(id) {
    const conexao = await mongo.retornarConexao();
    try {
        let objectId = new ObjectId(id);
        return await conexao.db('Controle-Estoque').collection('Produtos').findOne({ _id: objectId });
    }
    catch (ex) {
        throw ex;
    }
    finally {
        await mongo.fecharConexao(conexao);
    }
}

async function buscarTodosProdutos() {
    const conexao = await mongo.retornarConexao();
    try {
        return await conexao.db('Controle-Estoque').collection('Produtos').find({}).toArray();
    }
    catch (ex) {
        throw ex;
    }
    finally {
        await mongo.fecharConexao(conexao);
    }

}

export default { criarProduto, atualizarProduto, buscarProdutoPorId, buscarTodosProdutos };