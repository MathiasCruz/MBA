import mongodb from 'mongodb'

function getClient() {
    const uri = 'mongodb://mongoadmin:secret@localhost:27888/?authSource=admin'
    return new mongodb.MongoClient(uri);
}
async function retornarConexao() {
    try {
        const client = getClient();
        await client.connect();
        return client;
    }
    catch (ex) {
        throw ex;
    }
}
export default { retornarConexao, getClient }