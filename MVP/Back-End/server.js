import app from './index.js'
import ws from './sockets.js'

app.listen(3001, () => console.log("Servidor node iniciado"));

ws.iniciarwebSocket()