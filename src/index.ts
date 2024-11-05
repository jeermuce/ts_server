import WebSocket from 'ws';
const server = new WebSocket.Server({ port: 3001});
console.log('WebSocket server started on ws://localhost:3001');
server.on('connection', ws => {
    ws.on('message', message => {
        console.log(`Received message => ${message}`);
        ws.send('Hello! Response from server!');
    });
    ws.send('Hello! Message from server!');
});