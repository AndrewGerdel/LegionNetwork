process.env.DATABASE = 'LegionTest'; //Note: Set this before declaring the repository.

var mongoose = require('../db/mongoose.js');
var assert = require('assert');
var messageRepository = require('../Repositories/messageRepository.js');

var UnitTestSetup = (async () => {
    var db = await mongoose.GetDb();
    await db.collection('messages').drop();
});

// describe('messageRepositoryTests', function() {
//     UnitTestSetup();
//     it('#Add a new message, then ensure it is saved 3 seconds later.', function(done) {
//         var unitTestMessage = 'This is my unit test message';
//         messageRepository.AddMessage(unitTestMessage, new Date(), 'text').then((message)=> {
//             assert.equal(message.content, unitTestMessage);
//             setTimeout(() => {
//                 messageRepository.GetAllMessages().then((result) => {
//                     assert.equal(1, result.length);
//                     mongoose.Disconnect();
//                     done();
//                 });
//             }, 3000);
//         });
//     })
// });