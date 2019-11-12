var { Node } = require('../DbModels/node.js');
var mongoose = require('../db/mongoose.js');

mongoose.GetDb().then((db) => {
    db.collection("nodes").createIndex({ "uid": 1 }, { unique: true });
});


var GetAllNodes = (async () => {
    var db = await mongoose.GetDb();
    var nodes = await db.collection('nodes').find().toArray();
    return nodes;
});

var GetNode = (async (uid) => {
    var db = await mongoose.GetDb();
    var nodes = await db.collection('nodes').find({ uid: uid }).toArray();
    if(nodes.length > 0){
        return nodes[0];
    }else{
        return null;
    }
});

var AddNode = (async (uri, uid) => {
    var foundNode = await GetNode(uid);
    if (!foundNode) {
        var newNode = new Node({
            uri: uri,
            dateAdded: new Date(),
            uid: uid
        });
        newNode.save();
        return newNode;
    } else {
        return foundNode;
    }
});

var DeleteNode = (async(uid) => {
    var db = await mongoose.GetDb();
    db.collection('nodes').deleteOne({ uid: uid });
    return true;
});


module.exports =
{
    GetAllNodes,
    AddNode, 
    DeleteNode
}