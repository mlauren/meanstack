'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var WorkSchema = new Schema({
  title: String,
  description: String,
  images: [{
    type: Schema.ObjectId,
    ref: 'Image'
  }],
  tags: [{
    type: String
  }],
  _creator: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  email: String,
  userName: String,
  createTime: {
    type: Date,
    'default': Date.now
  }
});

module.exports = mongoose.model('Work', WorkSchema);