const express = require('express');

process.env.PORT = 65453;

var app = express();
//render out a simple default page. 
app.get('/', (req, res) => {
    res.send('Welcome to the blockchain.');
});

app.listen(process.env.PORT, () => {
    console.log('Server is up and running on port', process.env.PORT);
});