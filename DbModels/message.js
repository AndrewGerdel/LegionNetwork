var mongoose = require('mongoose');
var Message = mongoose.model('Message', {
    content: {
      type: String,
      required: true,
      trim: true
    },
    dateAdded: {
      type: Date,
      required: true
    },
    type:{
        type: String,
        required: true,
        trim: true
    },
    hash:{
        type: String,
        required: true,
        trim: true
    },
  });
  
  module.exports = {
    Message
  }
  