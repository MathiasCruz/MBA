import mongo from './mongodb.js'
import { ObjectId } from 'mongodb'
import ws from '../sockets.js'

async function criarPedido(pedido) {
    const conexao = await mongo.retornarConexao();
    try {
        let newPedido = {...pedido,id_cliente:new ObjectId(pedido.id_cliente),produtos:pedido.produtos.map((itens)=>{return {_id:new ObjectId(itens.id_produto),quantidade:itens.qtdReservado,valor:itens.valor}})}
        await conexao.db('Controle-Estoque').collection('Pedidos').insertOne(newPedido)
        // ws.on('open',function open(){
        //     ws.send("Atualizou");
        // })
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
