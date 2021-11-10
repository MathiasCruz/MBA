import mongodb from 'mongodb'

function getClient(){
    const uri = 'mongodb://mongoadmin:secret@localhost:27888/?authSource=admin'
    return new mongodb.MongoClient(uri);
}
async function retornarConexao(){
    try{
        const client = getClient(); 
        return await client.connect();
    }
    catch(ex){
        throw ex;
    }
} 
export {retornarConexao}