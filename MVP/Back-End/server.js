import app from './index.js'
import ws from './sockets.js'
import mongo from './repository/mongodb.js'

app.listen(3001, () => console.log("Servidor node iniciado"));
mongo.getClient().connect().then(()=>console.log("Conectado ao banco de dados")).catch((err)=>console.log(err));
ws.iniciarwebSocket()