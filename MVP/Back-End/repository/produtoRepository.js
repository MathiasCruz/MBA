import {retornarConexao} from './mongodb.js'

async function criaProduto(produto){
    try{
        const conexao = await retornarConexao();
        await conexao.db('Controle-Estoque').collection('Produtos').insertOne(produto)
    }
    catch(ex){
        throw ex;
    }
    finally{
        await conexao.close();
    }

}

export {criaProduto};