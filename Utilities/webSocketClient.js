const WebSocket = require('ws');
const util = require('util');
const config = require('../config.json');
// test client code.
const ws = new WebSocket('ws://127.0.0.1:65456/');
ws.on('open', function open() {
    var uri =  util.format('ws://%s:%s', config.node.ip, config.node.port);
    var msg = { category: 'NODE', type: 'ADD', content: {uri: uri, uid: config.node.uid} };
    ws.send(JSON.stringify(msg));
});

ws.on('message', function incoming(data) {
    console.log('Client received: ', data);
});