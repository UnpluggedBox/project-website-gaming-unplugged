var mongoose = require('mongoose');
const slugify = require('slugify')

var CarouselSchema = new mongoose.Schema({
  title: {
      type: String, 
      required: [true, "can't be blank"]
    },
  summary: {
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
  }
}, {timestamps: true});

CarouselSchema.pre('validate', function(next){
  if(this.title){
      this.slug = slugify(this.title, { lower:true, strict:true })
  }
  next()
})


module.exports = mongoose.model('Carousel', CarouselSchema);