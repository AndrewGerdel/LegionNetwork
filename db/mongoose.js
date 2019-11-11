var { MongoClient } = require('mongodb');
var mongoose = require('mongoose');
var connectionString = require('../config.json').database;

mongoose.Promise = global.Promise;
if(process.env.DATABASE){
  console.log(`Overriding database name to ${process.env.DATABASE}`);
}else{
  process.env.DATABASE = "Legion";
}
mongoose.connect(connectionString.host + (process.env.DATABASE || connectionString.database), { useNewUrlParser: true,  useUnifiedTopology: true , w: 1 }, (error, client) => {
  if (error) {
    logger.WriteLog('Unable to connect to Mongo', true);
    return;
  }
});

var Disconnect = (() => {
  mongoose.disconnect();
})

var DB;

var GetDb = (() => {
  var promise = new Promise((resolve, reject) => {
    if (DB) {
      resolve(DB);
    } else {
      var start = new Date();
      MongoClient.connect(connectionString.host, { useUnifiedTopology: true }, (error, client) => {
        if (error) {
          logger.WriteLog('Unable to connect to Mongo', true);
          return;
        }
        DB = client.db((process.env.DATABASE || connectionString.database));
        var end = new Date();
        resolve(DB);
      });
    }
  });
  return promise;
});

module.exports = { mongoose, GetDb, Disconnect };
