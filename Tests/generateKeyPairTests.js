var assert = require('assert');
var generateKeyPair = require('../Modules/generateKeyPair');
var fs = require('fs');

describe('generateKeyPairTests', function() {
    it('should generate a key pair', async function() {
        var result = await generateKeyPair.GenerateKeyPair();
        assert.equal(result.PublicKey.length > 0, true, 'The public key is incorrect');
        assert.equal(result.PrivateKey.length > 0, true, 'The public key is incorrect');
    }),
    it('save a keypair to disk', async function() {
        var result = await generateKeyPair.GenerateAndSaveKeyPair('Password1');
        // assert.equal(result, true);
        var dirExists = fs.existsSync(result);
        assert.equal(dirExists, true);
    });
});