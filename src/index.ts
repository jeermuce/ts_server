import WebSocket, { Server, WebSocket as WS } from "ws";

const server: Server = new WebSocket.Server({ port: 3001 });
console.log("WebSocket server started on ws://localhost:3001");

interface Message {
    clientId: string;
    message: string;
}

let counter: number = 0;
let messages: Message[] = [];
let clientIdCounter: number = 0; // Simple counter for unique client IDs

server.on("connection", (ws: WS) => {
    const clientId: string = `client_${clientIdCounter++}`; // Generate a unique ID for each client
    console.log(`Client connected: ${clientId}`);

    ws.on("message", (message: Buffer) => {
        const decodedMessage = message.toString();
        console.log(`Received message from ${clientId}: ${decodedMessage}`);
        counter++;
        messages.push({ clientId, message: decodedMessage });

        // Broadcast the counter value and all messages to all connected clients
        server.clients.forEach(client => {
            if (client.readyState === WS.OPEN) {
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
        });
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
