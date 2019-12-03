
require('./WebServices/startWebServiceServices'); //Start the web services
require('./WebSockets/startWebSocketServices');  //Start the web sockets, for node-to-node communication.

process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at: ' + p + reason);
});



var nodeProcessService = require('./Processes/nodeProcess');
nodeProcessService.StartService();