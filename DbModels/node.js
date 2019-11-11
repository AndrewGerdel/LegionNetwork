var mongoose = require('mongoose');
var Node = mongoose.model('Node', {
  uri: {
    type: String,
    required: true,
    trim: true
  },
  dateAdded: {
    type: Date,
    required: true
  },
  uid : {
    type: String,
    require: true
  }
});

module.exports = {
  Node
}
