import WebSocket from "ws";

const server = new WebSocket.Server({ port: 3001 });
console.log("WebSocket server started on ws://localhost:3001");

let counter = 0;
let broadcastMessage = "Hello! Message from server!";

server.on("connection", (ws) => {
    ws.on("message", (message) => {
        console.log(`Received message => ${message}`);
        counter++;

        // Broadcast the counter value to all connected clients
        for (const client of server.clients) {
            broadcastMessage = `${message}`;
            if (client.readyState === WebSocket.OPEN) {
                client.send(`counter: ${counter}`);
                client.send(`${broadcastMessage}`);
            }
        }
    });

    ws.send("Hello! Message from server!");
});
