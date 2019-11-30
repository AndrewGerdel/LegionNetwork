var assert = require('assert');
var bitcoin = require('../Modules/bitcoin');

describe('generateKeyPairTests', function() {
    it('should generate a bitcoin wallet', async function() {
        var result = await bitcoin.GenerateKeypair();
        assert.equal(result.PublicKey.length > 0, true, 'The public key is incorrect');
        assert.equal(result.PrivateKey.length > 0, true, 'The public key is incorrect');
    });
});
