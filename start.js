const express = require('express');
var nodeRepository = require('./Repositories/nodeRepository.js');

process.env.PORT = 65453;

var app = express();
//render out a simple default page. 
app.get('/', (req, res) => {
    res.send('Welcome to the blockchain.');
});

app.get('/', (req, res) => {
    res.send('Welcome to the blockchain.');
});

app.get('/nodes/', async(req, res) => {
    var nodes = await nodeRepository.GetAllNodes();
});

app.listen(process.env.PORT, () => {
    console.log('Server is up and running on port', process.env.PORT);
});