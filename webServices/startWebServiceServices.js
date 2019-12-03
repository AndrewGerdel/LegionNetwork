const express = require('express');
const bodyParser = require('body-parser');
const config = require('../config.json');
const nodeWebService = require('./nodeWebService');

var app = express();
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(bodyParser.json({ limit: '10mb', extended: true }));

//render out a simple default page. 
app.get('/', (req, res) => {
    res.send('Welcome to the blockchain.');
});

//Launch the API endpoints
nodeWebService.StartService(app).then(() => {
    //Start listening on the specified port
    app.listen(config.node.port, () => {
        console.log('Server is up and running on port', config.node.port);
    });

});
