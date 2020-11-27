const { ObjectID, ObjectId } = require('mongodb');
var mongoose = require('mongoose');

var ArticleSchema = new mongoose.Schema({
  title: {
      type: String, 
      required: [true, "can't be blank"]
    },
  writer: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, "can't be blank"]
    },
  genre: [{
      type: String
  }],
  content: {
    type: String,
    required: true
  },  
  visitCount: {
   type: Number,
   default: 0,
  },
  category: {
    type: String,
    required: true
  }, 
  image: {
      data: Buffer,
      contentType: String
  },
  comments: [{type: Schema.Types.ObjectId, ref: "Comment"}] 

}, {timestamps: true});

module.exports = mongoose.model('Article', ArticleSchema);