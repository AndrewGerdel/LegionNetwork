const config = require('../config.json');
const nodeWebSocket = require('./nodeWebSocket');
const messageWebSocket = require('./messageWebSocket');
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: config.node.webSocketPort });


function noop() { }

function heartbeat() {
    this.isAlive = true;
}

var openWebSockets = [];

wss.on('connection', function connection(ws) {
    ws.isAlive = true;
    ws.on('pong', heartbeat);
    openWebSockets.push(ws);
    ws.on('message', async function incoming(message) {
        message = JSON.parse(message);
        if (message.category) {
            if (message.category === 'NODE') {
                var result = await nodeWebSocket.ProcessMessage(message);
                ws.send(JSON.stringify(result));
            } else if (message.category === 'MESSAGE') {
                var result = await messageWebSocket.ProcessMessage(message);
            }
        } else {
            console.log('Received message with invalid category value. %s', JSON.stringify(message));
            ws.send(JSON.stringify({ success: false, error: 'Invalid message.category' }));
        }
    });
});

setInterval(() => {
    wss.clients.forEach((ws) => {
        if (ws.isAlive === false) {
            return ws.terminate();
        }
        ws.isAlive = false;
        ws.ping(noop);
    });
}, 60000);
