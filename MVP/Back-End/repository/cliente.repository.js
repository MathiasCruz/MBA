import mongo from './mongodb.js'
import { ObjectId } from 'mongodb'

async function criarCliente(cliente) {
    const conexao = await mongo.retornarConexao();
    try {
        await conexao.db('Controle-Estoque').collection('Clientes').insertOne(cliente)
    }
    catch (ex) {
        throw ex;
    }
    finally {
        await mongo.fecharConexao(conexao);
    }
}

async function atualizarCliente(cliente) {
    const conexao = await mongo.retornarConexao();
    try {
        let objectId = new ObjectId(cliente._id);
        await conexao.db('Controle-Estoque').collection('Clientes').updateOne({ _id: objectId }, { $set: { ...cliente } });
    }
    catch (ex) {
        throw ex;
    }
    finally {
        await mongo.fecharConexao(conexao);
    }
}

async function buscarClientePorId(id) {
    const conexao = await mongo.retornarConexao();
    try {
        let objectId = new ObjectId(id);
        return await conexao.db('Controle-Estoque').collection('Clientes').findOne({ _id: objectId });
    }
    catch (ex) {
        throw ex;
    }
    finally {
        await mongo.fecharConexao(conexao);
    }
}

async function buscarTodosClientes() {
    const conexao = await mongo.retornarConexao();
    try {
        return await conexao.db('Controle-Estoque').collection('Clientes').find({}).toArray();
    }
    catch (ex) {
        throw ex;
    }
    finally {
        await mongo.fecharConexao(conexao);
    }

}

async function buscarClientePorTelefone(telefone) {
    const conexao = await mongo.retornarConexao();
    try {
        return await conexao.db('Controle-Estoque').collection('Clientes').find({ $text: { telefone } });
    }
    catch (ex) {
        throw ex;
    }
    finally {
        await mongo.fecharConexao(conexao);
    }

}

export default { criarCliente, atualizarCliente, buscarClientePorId, buscarTodosClientes, buscarClientePorTelefone };