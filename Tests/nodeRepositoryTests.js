process.env.DATABASE = 'LegionTest'; //Note: Set this before declaring the nodeRepository.

var mongoose = require('../db/mongoose.js');
var assert = require('assert');
var nodeRepository = require('../Repositories/nodeRepository.js');

var UnitTestSetup = (async () => {
    var db = await mongoose.GetDb();
    await db.collection('nodes').drop();
});

describe('nodeRepositoryTests', function() {
    UnitTestSetup()
    it('#Add a new node, then ensure it is saved 3 seconds later.', function(done) {
        nodeRepository.AddNode('http://unittest', 'abc123').then((node)=> {
            assert.equal(node.uid, 'abc123');
            setTimeout(() => {
                nodeRepository.GetAllNodes().then((result) => {
                    assert.equal(1, result.length);
                    mongoose.Disconnect();
                    done();
                });
            }, 3000);
        });
    })
});