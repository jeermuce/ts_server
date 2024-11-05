import WebSocket from "ws";
const server = new WebSocket.Server({ port: 3001 });
console.log("WebSocket server started on ws://localhost:3001");

let counter = 0;
server.on("connection", (ws) => {
    ws.on("message", (message) => {
        console.log(`Received message => ${message}`);
        counter++;
        ws.send(`Message received! Counter: ${counter}`);
        broadcastCounter();
    });
    ws.send("Hello! Message from server!");
});

function broadcastCounter() {
    for (const client of server.clients) {
        if (client.readyState === WebSocket.OPEN) {
            client.send(`Counter: ${counter}`);
        }
    }
}
