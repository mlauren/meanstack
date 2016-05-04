'use strict';

import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var ImageSchema = new mongoose.Schema({
  title: String,
  url: String,
  description: String,
  _creator: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

export default mongoose.model('Image', ImageSchema);
