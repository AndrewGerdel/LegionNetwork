var crypto2 = require('crypto2');

var Encrypt = (async (plainText, publicKey) => {
    return crypto2.encrypt.rsa(plainText, publicKey);
});

var Decrypt = (async (encryptedText, privateKey) => {
    return crypto2.decrypt.rsa(encryptedText, privateKey);
});

module.exports = {
    Encrypt,
    Decrypt
}