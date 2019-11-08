var fs = require('fs');
var crypto = require('crypto');
var sha256 = require('./sha256');

var GenerateKeyPair = (async () => {
    var keyPair = crypto.generateKeyPairSync('rsa', {
        modulusLength: 4096,
        publicKeyEncoding: {
            type: 'spki',
            format: 'pem'
        },
        privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem'
        }
    });
    var address = await sha256.CreateHash(keyPair.publicKey.toString('hex'));
    return { Address: address.toString('hex'), PublicKey: keyPair.publicKey, PrivateKey: keyPair.privateKey };
});

var GenerateAndSaveKeyPair = (async (password) => {
    var keyPair = await GenerateKeyPair();

    var dirName = keyPair.Address.substr(0, 3) + keyPair.Address.substr(61, 3);
    fs.mkdirSync(`./keys/${dirName}`, { recursive: true });
    fs.writeFile(`./keys/${dirName}/address.txt`, `${keyPair.Address}`, (err) => {
        if (err) {
            console.log('Error saving address: ', err);
        }
    });
    fs.writeFile(`./keys/${dirName}/public.pem`, `${keyPair.PublicKey}`, (err) => {
        if (err) {
            console.log('Error saving public: ', err);
        }
    });

    if (password && password.length > 0) {
        //encrypt the private key to private.aes.
        var cipher = crypto.createCipher('aes-256-cbc', password);
        var encrypted = Buffer.concat([cipher.update(new Buffer.from(JSON.stringify(keyPair.PrivateKey), "utf8")), cipher.final()]);
        fs.writeFileSync(`./keys/${dirName}/private.aes`, encrypted);
        console.log(`Encryption complete. Wrote to ./keys/${dirName}`);
    }else{
        fs.writeFileSync(`./keys/${dirName}/private.txt`, keyPair.PrivateKey);
        console.log(`WARNING: PrivateKey file is not encrypted. Wrote to ./keys/${dirName}`);
    }
    return `./keys/${dirName}`;
});

module.exports = {
    GenerateAndSaveKeyPair,
    GenerateKeyPair
}

