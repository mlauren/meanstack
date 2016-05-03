'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var WorkSchema = new Schema({
  image: String,
  title: String,
  description: String,
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