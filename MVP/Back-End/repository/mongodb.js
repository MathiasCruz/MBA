import mongodb from 'mongodb'

function getClient() {
    const uri = 'mongodb://mongoadmin:secret@localhost:27888/?authSource=admin'
    return new mongodb.MongoClient(uri);
}
async function retornarConexao() {
    try {

        const client = getClient();
        await client.connect();

        // const database = client.db("Controle-Estoque");
        // const collection = database.collection("Pedidos");
        // changeStream = collection.watch().on("change", () => {
        //     console.log("Pedido realizado \t");;
        // });

        return client;
    }
    catch (ex) {
        throw ex;
    }
}

async function fecharConexao(conexao) {

    // await changeStream.close()
    await conexao.close();
    return;
}


export default { retornarConexao, getClient, fecharConexao }