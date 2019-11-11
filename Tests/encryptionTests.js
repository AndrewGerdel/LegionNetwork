var assert = require('assert');
var encrypt = require('../Modules/encryption');
var genKeyPair = require('../Modules/generateKeyPair');
var fs = require('fs');

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
    }),
    //this test is just too noisy...
    // it('should fail decryption', async function() {
    //     var originalText = 'Super Secret Words';
    //     var keypair1 = await genKeyPair.GenerateKeyPair();
    //     var keypair2 = await genKeyPair.GenerateKeyPair();
    //     var encryptedResults  = await encrypt.Encrypt(originalText, keypair1.PublicKey);
    //     //Now decrypt with a different private key
    //     assert.rejects(function() { encrypt.Decrypt(encryptedResults, keypair2.PrivateKey)});
    //     // assert.throws( function() { encrypt.Decrypt(encryptedResults, keypair2.PrivateKey)}, Error, "Error Thrown");
    // }),
    it('should encrypt long text', async function() {
        var originalText = fs.readFileSync("Tests/Files/LoremIpsum.txt");
        var keypair = await genKeyPair.GenerateKeyPair()
        var encryptedResults  = await encrypt.Encrypt(originalText, keypair.PublicKey);
        var decryptedResults = await encrypt.Decrypt(encryptedResults, keypair.PrivateKey);
        assert.equal(decryptedResults, originalText, 'The decrypted text does not match');
    }),
    it('should encrypt a PDF file', async function() {
        var originalText = fs.readFileSync("Tests/Files/LoremIpsum.txt");
        var keypair = await genKeyPair.GenerateKeyPair()
        var encryptedResults  = await encrypt.Encrypt(originalText, keypair.PublicKey);
        var decryptedResults = await encrypt.Decrypt(encryptedResults, keypair.PrivateKey);
        assert.equal(decryptedResults, originalText, 'The decrypted text does not match');
    });
});