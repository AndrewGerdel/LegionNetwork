var nodeRepository = require('../Repositories/nodeRepository.js');

var StartService = (async (app) => {
    app.get('/nodes/', async (req, res) => {
        var nodes = await nodeRepository.GetAllNodes();
        res.send(nodes);
    });
});

module.exports = {
    StartService
}