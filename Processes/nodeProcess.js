var nodeRepository = require('../Repositories/nodeRepository.js');
var config = require('../config.json');
var request = require('request');

var StartService = (() => {
    RegisterWithRemoteNodes();
});


var RegisterWithRemoteNodes = (async () => {
    var uri = `${config.node.protocol}://${config.node.ip}:${config.node.port}`
    nodeRepository.AddNode(uri, config.node.uid); //Add ourselves as a node.  This is helpful for development, but may need to take it out later.
    var nodeList = await nodeRepository.GetAllNodes();
    
    nodeList.forEach(node => {
        var nodeRegisterEndPoint = node.uri + '/nodes/register';
        var options = {
            url: nodeRegisterEndPoint,
            method: 'POST',
            json: { uri: uri,  uid: config.node.uid }
        };
        request(options, async (err, res, body) => {
            if (err) {
                nodeRepository.DeleteNode(node.uid);
            }
        });
    });
});


module.exports = {
    StartService
}