
require('./WebServices/startWebServiceServices');
require('./WebSockets/startWebSocketServices');

process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at: ' + p + reason);
});



