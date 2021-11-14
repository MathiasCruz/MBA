import mongo from './mongodb.js'
import { ObjectId } from 'mongodb'
import ws from '../sockets.js'

async function criarPedido(pedido) {
    const conexao = await mongo.retornarConexao();
    try {
        await conexao.db('Controle-Estoque').collection('Pedidos').insertOne(pedido)
        ws.on('open',function open(){
            ws.send("Atualizou");
        })
    }
    catch (ex) {
        throw ex;
    }
    finally {
        await mongo.fecharConexao(conexao);
    }
}

async function buscarPedidoPorId(id) {
    const conexao = await mongo.retornarConexao();
    try {
        let objectId = new ObjectId(id);
        return await conexao.db('Controle-Estoque').collection('Pedidos').findOne({ _id: objectId });
    }
    catch (ex) {
        throw ex;
    }
    finally {
        await mongo.fecharConexao(conexao);
    }
}

async function buscarTodosPedidos() {
    const conexao = await mongo.retornarConexao();
    try {
        return await conexao.db('Controle-Estoque').collection('Pedidos').find({}).toArray();
    }
    catch (ex) {
        throw ex;
    }
    finally {
        await mongo.fecharConexao(conexao);
    }
}

export default { criarPedido, buscarPedidoPorId, buscarTodosPedidos }
