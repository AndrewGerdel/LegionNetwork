const express = require('express');
const bodyParser = require('body-parser');
const nodeWebService = require('./WebServices/nodeWebService');
const nodeProcessService = require('./Processes/nodeProcess');
const config = require('./config.json');

process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at: Promise' + p + reason);
  });

var app = express();
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(bodyParser.json({ limit: '10mb', extended: true }));

//render out a simple default page. 
app.get('/', (req, res) => {
    res.send('Welcome to the blockchain.');
});

//Launch the endpoints
nodeWebService.StartService(app).then(() => {
    //Start listening on the specified port
    app.listen(config.node.port, () => {
        console.log('Server is up and running on port', config.node.port);
    });

    //Launch the processes.
    nodeProcessService.StartService();
});

