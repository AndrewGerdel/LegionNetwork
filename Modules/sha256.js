var crypto = require('crypto');
var CreateHash = (async (input) => {
    var hash = await crypto.createHash("sha256").update(input.trim()).digest();
    return hash
  });

  module.exports = {
      CreateHash
  }