const config = require('../config.json');
const nodeWebSocket = require('./nodeWebSocket');
const messageWebSocket = require('./messageWebSocket');
const util = require('util');
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: config.node.webSocketPort });

wss.on('connection', function connection(ws) {
    ws.on('message', async function incoming(message) {
        message = JSON.parse(message);
        if (message.category) {
            if (message.category === 'NODE') {
                var result = await nodeWebSocket.ProcessMessage(message);
                ws.send(JSON.stringify(result));
            } else if(message.category === 'MESSAGE'){
                var result = await messageWebSocket.ProcessMessage(message);
            }
            } else {
                console.log('Received message with invalid category value. %s', JSON.stringify(message));
                ws.send(JSON.stringify({ success: false, error: 'Invalid message.category' }));
            }
        } else {
            console.log('Received message with missing category value. %s', JSON.stringify(message));
            ws.send(JSON.stringify({ success: false, error: 'Missing message.category' }));
        }
    });
});

// // // test client code.
// const ws = new WebSocket('ws://127.0.0.1:65456/');
// ws.on('open', function open() {
//     var uri =  util.format('ws://%s:%s', config.node.ip, config.node.port);
//     var msg = { category: 'NODE', type: 'ADD', content: {uri: uri, uid: config.node.uid} };
//     ws.send(JSON.stringify(msg));
// });

// ws.on('message', function incoming(data) {
//     console.log('Client received: ', data);
// });