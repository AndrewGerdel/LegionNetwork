process.env.DATABASE = 'LegionTest'; 

var assert = require('assert');
var nodeWebSocket = require('../WebSockets/nodeWebSocket');

describe('#nodeWebSocketTests', function() {
    it('should register a new node', async function() {
        var message = {category: 'NODE', type: 'ADD', content: {uid: 'unitTestXyz', uri: 'http://1.1.1.1:9876'} };
        var result = await nodeWebSocket.ProcessMessage(message);
        assert.equal(result.success, true);
    }),
    it('should fail to register a new node', async function() {
        var message = {category: 'NODE', type: 'XXX', content: {uid: 'unitTestXyz', uri: 'http://1.1.1.1:9876'} };
        var result = await nodeWebSocket.ProcessMessage(message);
        assert.equal(result.success, false);
    })
});

