const { ObjectID, ObjectId } = require('mongodb');
var mongoose = require('mongoose');

var ArticleSchema = new mongoose.Schema({
  title: {
      type: String, 
      required: [true, "can't be blank"],
      index: true,
      unique: true
    },
  writer: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, "can't be blank"]
    },
  content: String,  
  visitCount: Number,
  image: {
      data: Buffer,
      contentType: String
  },
  comments: [{type: Schema.Types.ObjectId, ref: "Comment"}] 

}, {timestamps: true});

module.exports = mongoose.model('Article', ArticleSchema);