import WebSocket from "ws";
import { v4 as uuidv4 } from "uuid"; // Use uuid for unique client identifiers

const server = new WebSocket.Server({ port: 3001 });
console.log("WebSocket server started on ws://localhost:3001");

let counter = 0;
let messages = [];

server.on("connection", (ws) => {
    const clientId = uuidv4(); // Generate a unique ID for each client
    console.log(`Client connected: ${clientId}`);

    ws.on("message", (message) => {
        console.log(`Received message from ${clientId}: ${message}`);
        counter++;
        messages.push({ clientId, message });

        // Broadcast the counter value and all messages to all connected clients
        for (const client of server.clients) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({
                    type: "allMessages",
                    counter: counter,
                    messages: messages.map(m => m.message)
                }));

                // Send only the messages from the specific client
                const clientMessages = messages.filter(m => m.clientId === clientId).map(m => m.message);
                client.send(JSON.stringify({
                    type: "clientMessages",
                    counter: counter,
                    messages: clientMessages
                }));
            }
        }
    });

    ws.send(JSON.stringify({
        type: "allMessages",
        counter: counter,
        messages: messages.map(m => m.message)
    }));

    // Send only the initial welcome message to the new client
    ws.send(JSON.stringify({
        type: "clientMessages",
        counter: 0,
        messages: ["Hello! Message from server!"]
    }));
});
