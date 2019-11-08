var assert = require('assert');
var encrypt = require('../Modules/encryption');
var genKeyPair = require('../Modules/generateKeyPair');

describe('encryptionTests', function() {
    it('should encrypt and decrypt data', async function() {
        var originalText = 'Super Secret Words';
        var keypair = await genKeyPair.GenerateKeyPair();
        var encryptedResults  = await encrypt.Encrypt(originalText, keypair.PublicKey);
        var decryptedResults = await encrypt.Decrypt(encryptedResults, keypair.PrivateKey);
        assert.equal(decryptedResults, originalText, 'The decrypted text does not match');
    }),
    it('should not have matching encrypted messages', async function() {
        var originalText1 = 'Super Secret Words';
        var originalText2 = 'More Super Secret Words';
        var keypair = await genKeyPair.GenerateKeyPair();
        var encryptedResults1  = await encrypt.Encrypt(originalText1, keypair.PublicKey);
        var encryptedResults2  = await encrypt.Encrypt(originalText2, keypair.PublicKey);
        assert.notEqual(encryptedResults1, encryptedResults2, 'The encrypted text should not match');
        var decryptedResults1 = await encrypt.Decrypt(encryptedResults1, keypair.PrivateKey);
        assert.equal(decryptedResults1, originalText1, 'The decrypted text1 does not match');
        var decryptedResults2 = await encrypt.Decrypt(encryptedResults2, keypair.PrivateKey);
        assert.equal(decryptedResults2, originalText2, 'The decrypted text2 does not match');
    })
});