var mongoose = require('mongoose');
var Message = mongoose.model('Message', {
  message: {
    type: String,
    required: true,
    trim: true
  },
  dateAdded: {
    type: Date,
    required: true
  },
  type: {
    type: String,
    required: true,
    trim: true
  },
  hash: {
    type: String,
    required: true,
    trim: true
  },
  from: {
    type: String,
    required: true,
    trim: true
  },
  to: {
    type: String,
    required: false,
    trim: true
  },
});

module.exports = {
  Message
}
