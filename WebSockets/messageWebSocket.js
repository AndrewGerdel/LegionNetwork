var messageRepository = require('../Repositories/messageRepository');
var messageSign = require('../Modules/messageSign');
var hash = require('../Modules/sha256');

var ProcessMessage = (async (message) => {
    if (message.type === 'ADD') {
        if (!message.content) return { success: false, message: 'Missing required field content' };
        if (!message.content.publicKey) return { success: false, message: 'Missing required field content.publicKey.' };
        if (!message.content.signature) return { success: false, message: 'Missing required field content.signature.' };
        if (!message.content.message) return { success: false, message: 'Missing required field content.message.' };
        if (!message.content.type) return { success: false, message: 'Missing required field content.type.' };

        var verified = await messageSign.VerifyMessage(message.content.publicKey, message.content.signature, message.content.message);
        if (verified === true) {
            var from = await hash.CreateHash(message.content.publicKey);
            messageRepository.AddMessage(message.content.message, new Date(), message.content.type, from.toString('base64'), message.content.to);
            return { success: true };
        } else {
            return { success: false, message: 'Message failed varification' };
        }
    } else {
        return { success: false, message: 'Invalid message.type' };
    }
});

module.exports = {
    ProcessMessage
}