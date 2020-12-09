const { ObjectID, ObjectId } = require('mongodb');
var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  username: {
      type: String, 
      required: [true, "can't be blank"],
      match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
      index: true,
      unique: true
    },
  email: {
      type: String,
      lowercase: true,
      required: [true, "can't be blank"],
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'is invalid'],
      index: true,
      unique: true
    },
  password: String,
  bio: String,
  image: {
      data: Buffer,
      contentType: String
  },
  firstName: String,
  lastName: String,
  genre: String,
  history: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Article',
  }],
  role: {
      type: String,
      required: true,
      default: 'User'
  }

}, {timestamps: true});

module.exports = mongoose.model('User', UserSchema);