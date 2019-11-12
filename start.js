const express = require('express');
const bodyParser = require('body-parser');
const nodeWebService = require('./webServices/nodeWebService');

process.env.PORT = 65454;

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

nodeWebService.StartService(app);



app.listen(process.env.PORT, () => {
    console.log('Server is up and running on port', process.env.PORT);
});