const express = require('express');
const bodyParser = require('body-parser');
const nodeWebService = require('./WebServices/nodeWebService');
const nodeWebSocket = require('./WebSockets/nodeWebSocket');
const nodeProcessService = require('./Processes/nodeProcess');
const config = require('./config.json');
const util = require('util');

process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at: ' + p + reason);
});

var app = express();
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(bodyParser.json({ limit: '10mb', extended: true }));

//render out a simple default page. 
app.get('/', (req, res) => {
    res.send('Welcome to the blockchain.');
});

//Launch the API endpoints
nodeWebService.StartService(app).then(() => {
    //Start listening on the specified port
    app.listen(config.node.port, () => {
        console.log('Server is up and running on port', config.node.port);
    });

    //Launch the processes.
    nodeProcessService.StartService();
});

const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: config.node.webSocketPort });

wss.on('connection', function connection(ws) {
    ws.on('message', async function incoming(message) {
        message = JSON.parse(message);
        if (message.type) {
            if (message.category === 'NODE') {
                var result = await nodeWebSocket.ProcessMessage(message);
                ws.send(JSON.stringify(result));
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

// // test client code.
const ws = new WebSocket('ws://127.0.0.1:65456/');
ws.on('open', function open() {
    var uri =  util.format('ws://%s:%s', config.node.ip, config.node.port);
    var msg = { category: 'NODE', type: 'ADD', content: {uri: uri, uid: config.node.uid} };
    ws.send(JSON.stringify(msg));
});

ws.on('message', function incoming(data) {
    console.log('Client received: ', data);
});
