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
        assert.equal(result.toString('hex'), result.toString('hex'), 'The hashes are different');
    })
});