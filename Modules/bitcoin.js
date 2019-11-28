const bitcoin = require('bitcoinjs-lib');

var GenerateKeypair = (() => {
    const keyPair = bitcoin.ECPair.makeRandom();
    const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey });
    const publicKey = keyPair.publicKey.toString('hex');
    const privateKey = keyPair.toWIF();
    return { Address: address, PrivateKey: privateKey, PublicKey: publicKey };
});

module.exports ={
    GenerateKeypair
}