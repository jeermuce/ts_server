import WebSocket from "ws";

const server = new WebSocket.Server({ port: 3001 });
console.log("WebSocket server started on ws://localhost:3001");

let counter = 0;

server.on("connection", (ws) => {
    ws.on("message", (message) => {
        console.log(`Received message => ${message}`);
        counter++;

        // Broadcast the counter value to all connected clients
        server.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(`Current counter: ${counter}`);
            }
        });
    });

    ws.send("Hello! Message from server!");
});
