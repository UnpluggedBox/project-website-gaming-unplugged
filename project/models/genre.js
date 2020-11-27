var mongoose = require('mongoose');

var GenreSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: [true, "can't be blank"],
        unique: true
      },
  });
  
  module.exports = mongoose.model('Genre', GenreSchema);