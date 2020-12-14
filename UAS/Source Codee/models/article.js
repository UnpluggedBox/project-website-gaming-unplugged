const { ObjectID, ObjectId } = require('mongodb');
var mongoose = require('mongoose');
const slugify = require('slugify')

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
  content: {
    type: String,
    required: true
  },
  summary: {
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
  slug:{
    type: String,
    required: true,
    unique: true
  },
  comments: [{
    type: mongoose.Schema.ObjectId, 
    ref: "Comment"}] 

}, {timestamps: true});

ArticleSchema.pre('validate', function(next){
  if(this.title){
      this.slug = slugify(this.title, { lower:true, strict:true })
  }
  next()
})


module.exports = mongoose.model('Article', ArticleSchema);