const { ObjectID, ObjectId } = require('mongodb');
var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
  author: {
      type: mongoose.Schema.ObjectId,
      ref: 'User', 
      required: [true, "can't be blank"]
    },
  content: {
      type: String,
      required: [true, "can't be blank"]
    }

}, {timestamps: true});

module.exports = mongoose.model('Comment', CommentSchema);