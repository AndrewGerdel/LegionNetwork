process.env.DATABASE = 'LegionTest';

var assert = require('assert');
var messageWebSocket = require('../WebSockets/messageWebSocket');
var genKeyPair = require('../Modules/generateKeyPair');
var messageSign = require('../Modules/messageSign');
var messageTypeEnum = require('../Enums/messageTypes');

describe('#messageWebSocketTests', function () {
    it('should save a new message', async function () {
        var keyPair = await genKeyPair.GenerateKeyPair();
        var messageContent = "This is a top secret message";
        var signature = await messageSign.SignMessage(keyPair.PrivateKey, messageContent);
        var message = { category: 'MESSAGE', type: 'ADD', content: { publicKey: keyPair.PublicKey, signature: signature, message: messageContent, type: messageTypeEnum.MessageTypes.PlainText } };
        var result = await messageWebSocket.ProcessMessage(message);
        assert.equal(result.success, true);
    }),
        it('should fail to verify the signature of a new message', async function () {
            var keyPair = await genKeyPair.GenerateKeyPair();
            var messageContent = "This is a top secret message";
            var signature = await messageSign.SignMessage(keyPair.PrivateKey, messageContent);
            var message = { category: 'MESSAGE', type: 'ADD', content: { publicKey: keyPair.PublicKey, signature: signature, message: "xxx" + messageContent, type: messageTypeEnum.MessageTypes.PlainText } };
            var result = await messageWebSocket.ProcessMessage(message);
            assert.equal(result.success, false);
        }),
        it('should fail to save a new message because of missing fields', async function () {
            var keyPair = await genKeyPair.GenerateKeyPair();
            var messageContent = "This is a top secret message";
            var signature = await messageSign.SignMessage(keyPair.PrivateKey, messageContent);
            var message = { category: 'MESSAGE', type: 'ADD', content: { signature: signature, message: "xxx" + messageContent, type: messageTypeEnum.MessageTypes.PlainText } };
            var result = await messageWebSocket.ProcessMessage(message);
            assert.equal(result.success, false);
        })
});

