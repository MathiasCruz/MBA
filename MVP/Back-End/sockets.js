import { WebSocket, WebSocketServer } from "ws";

let sockets = [];
function iniciarwebSocket() {

    const server = new WebSocketServer({ port: 9090 });

    server.on("connection", (socket) => {
        sockets.push(socket);
        socket.on('message', function (msg) {
            sockets.forEach(s => s.send(msg));
        });
        console.log("Mensagem recebida")
    })



}


export default { iniciarwebSocket }

