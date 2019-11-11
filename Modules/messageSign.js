var crypto = require('crypto');

var VerifyMessage = (async(publicKey, signature, message) => {

    var verifier = crypto.createVerify('sha256');
    verifier.update(message);
    var verifyResult = verifier.verify(publicKey, signature,'base64');
    return verifyResult;
});

var SignMessage = (async(privateKey, message) => {
    var signer = crypto.createSign('sha256');
    signer.update(message);
    var signResult = signer.sign(privateKey,'base64');
    return signResult;
});


module.exports ={
    SignMessage,
    VerifyMessage
}