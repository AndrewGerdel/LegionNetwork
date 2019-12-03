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
    required: true
  },
  protocol : {
    type: String,
    required: true
  },
  webServicePort : {
    type: Number,
    required: true
  },
  webSocketPort : {
    type: Number,
    required: true
  }
});

module.exports = {
  Node
}
