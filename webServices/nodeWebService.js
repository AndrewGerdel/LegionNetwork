var nodeRepository = require('../Repositories/nodeRepository.js');

var StartService = (async(app) => {
    app.get('/nodes/', async(req, res) => {
        var nodes = await nodeRepository.GetAllNodes();
        res.send(nodes);
    });

    app.post('/nodes/register', async(req, res) => {
        var uri = req.body.uri;
        var uid = req.body.uid;
        nodeRepository.AddNode(uri, uid);
        res.send('Success');
    });
});

module.exports ={
    StartService
}