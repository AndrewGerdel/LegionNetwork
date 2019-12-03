

var nodeRepository = require('../Repositories/nodeRepository');
var ProcessMessage = (async (message) => {
    if (message.type === 'ADD') {
        if (!message.content ) return { success: false, message: 'Missing required field content' };
        if ( !message.content.uri ) return { success: false, message: 'Missing required field content.uri.' };
        if ( !message.content.uid) return { success: false, message: 'Missing required field content.uid.' };
        var newNode = await nodeRepository.AddNode(message.content.uri, message.content.uid);
        return { success: true, message: newNode };
    } else {
        return { success: false, message: 'Missing type' };
    }
});

module.exports = {
    ProcessMessage
}