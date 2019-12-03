var { Message } = require('../DbModels/message.js');
var mongoose = require('../db/mongoose.js');
var sha256 = require('../Modules/sha256');

mongoose.GetDb().then((db) => {
    db.collection("messages").createIndex({ "hash": 1 }, { unique: true });
});

var GetAllMessages = (async () => {
    var db = await mongoose.GetDb();
    var messsages = await db.collection('messages').find().toArray();
    return messsages;
});

var GetMessage = (async (hash) => {
    var db = await mongoose.GetDb();
    var messages = await db.collection('messages').find({ hash: hash }).toArray();
    if (messages.length > 0) {
        return messages[0];
    } else {
        return null;
    }
});

var AddMessage = (async (content, dateAdded, type, from, to) => {
    var hash = await sha256.CreateHash(`${content}${dateAdded}${type}${from}${to}`);
    var foundMessage = await GetMessage(hash.toString('base64'));
    if (!foundMessage) {
        var newMessage = new Message({
            message: content,
            dateAdded: dateAdded,
            type: type,
            hash: hash.toString('base64'),
            from: from,
            to: to
        });
        newMessage.save();
        return newMessage;
    } else {
        return foundMessage;
    }
});

module.exports = {
    AddMessage,
    GetMessage,
    GetAllMessages
}