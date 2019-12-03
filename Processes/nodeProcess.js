var nodeRepository = require('../Repositories/nodeRepository.js');
var config = require('../config.json');
var request = require('request');

const WebSocket = require('ws');
const util = require('util');


var openWebSocketConnections = [];

var StartService = (() => {
    RegisterWithRemoteNodes();
});


var RegisterWithRemoteNodes = (async () => {
    // var uri = `${config.node.protocol}://${config.node.ip}:${config.node.port}`
    // nodeRepository.AddNode(uri, config.node.uid); //Add ourselves as a node.  This is helpful for development, but may need to take it out later.
    var nodeList = await nodeRepository.GetAllNodes();

    nodeList.forEach(node => {
        try {
            const ws = new WebSocket(util.format('ws://%s:%s/', node.uri, node.webSocketPort));
            openWebSocketConnections.push(ws);
            ws.on('open', function open() {
                var uri = util.format('ws://%s:%s', config.node.ip, config.node.port);
                var msg = { category: 'NODE', type: 'ADD', content: { uri: uri, uid: config.node.uid } };
                ws.send(JSON.stringify(msg));
            });
        } catch {
            //todo: remove node
        }
     
    });
});


module.exports = {
    StartService
}


StartService();
