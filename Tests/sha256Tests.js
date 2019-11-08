var assert = require('assert');
var sha256 = require('../Modules/sha256');

describe('sha256Tests', function() {
    it('should generate a hash', async function() {
        var result = await sha256.CreateHash("Some Text");
        assert.equal(result.toString('hex').length, 64, 'The hash is invalid: Length=' + result.toString('hex').length);
    }),
    it('should generate the same hash twice', async function() {
        var result = await sha256.CreateHash("Some Text");
        var result2 = await sha256.CreateHash("Some Text");
        assert.equal(result.toString('hex'), result2.toString('hex'), 'The hashes are different');
    }),
    it('should generate the same hash for two objects', async function() {
        var object = {Property1: "Value1", Property2: "Value2"};
        var result = await sha256.CreateHash(JSON.stringify(object));
        var object2 = {Property1: "Value1", Property2: "Value2"};
        var result2 = await sha256.CreateHash(JSON.stringify(object2));
        assert.equal(result.toString('hex'), result2.toString('hex'), 'The hashes are different');
    }),
    it('should generate different hashes for two object', async function() {
        var object = {Property1: new Date(), Property2: "Value2"};
        var result = await sha256.CreateHash(JSON.stringify(object));
        var object2 = {Property1: new Date(), Property2: "Value3"};
        var result2 = await sha256.CreateHash(JSON.stringify(object2));
        assert.notEqual(result.toString('hex'), result2.toString('hex'), 'The hashes are different');
    });
});