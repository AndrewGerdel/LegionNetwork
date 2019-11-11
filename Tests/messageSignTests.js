var assert = require('assert');
var messageSign = require('../Modules/messageSign');
var generateKeyPair = require('../Modules/generateKeyPair');

describe('messageSigningTest', function() {
    it('should sign and verify a message', async function() {
        var message = 'This is my message';
        var result = await generateKeyPair.GenerateKeyPair();
        var signature = await messageSign.SignMessage(result.PrivateKey, message);
        var result = await messageSign.VerifyMessage(result.PublicKey, signature, message);
        assert.equal(result, true);
    }),
    it('should fail to verify a message', async function() {
        var message = 'This is my message';
        var keypair1 = await generateKeyPair.GenerateKeyPair();
        var keypair2 = await generateKeyPair.GenerateKeyPair();
        var signature = await messageSign.SignMessage(keypair1.PrivateKey, message);
        var result = await messageSign.VerifyMessage(keypair2.PublicKey, signature, message);
        assert.equal(result, false);
    })
});