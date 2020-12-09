const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Article = require('../models/article');
const Comment = require('../models/comment');
const { ObjectID, ObjectId } = require('mongodb');
const { request } = require('express');
const e = require('express');
const mongoose = require('mongoose');
const user = require('../models/user');
const db = mongoose.connection;

router.use(express.json());

router.get('/:slug', async (req, res) => {
    const article = await Article.findOne({ slug: req.params.slug })
    const relatednews = await Article.find()
    const fullName = await User.findOne({"_id":{"$in":article["writer"]}});
    const trendingarticles = await Article.find().sort({visitCount: -1}).limit(4)
    if (article == null) res.redirect('/')

    Article.findOneAndUpdate(
      {'slug': req.params.slug},
      {$inc: {visitCount: 1}},
      {safe: true, upsert: true, new : true},
      function(err, model) {
          
      }
    );
    
    var userNameCommentResult = []
    db.collection('comments').aggregate([
      // Join with users table
      { "$match": { "articleid": article._id } },
      {
          "$lookup":{
              "from": "articles",       
              "localField": "articleid",  
              "foreignField": "_id", 
              "as": "commentsoutput"         
          }
      },
      {
        "$lookup":{
            "from": "users",       
            "localField": "author",  
            "foreignField": "_id", 
            "as": "commentsoutput"         
        }
      },
      
      { "$replaceRoot": { "newRoot": { "$mergeObjects": [ { "$arrayElemAt": [ "$commentsoutput", 0 ],  }, "$$ROOT" ] } } },
      { "$project": { "commentsoutput": 0 } }

  ]).toArray(async function(err, result) {
    if (err) throw err;
    userNameCommentResult = result
    console.log(userNameCommentResult)

    if(article.category == 'News' && req.isAuthenticated()){
        res.render('pages/viewarticlenews', {
          username: req.user.username,
          isLoggedIn: true,
          article: article,
          fullName: fullName,
          comments: userNameCommentResult,
          relatednews: relatednews,
          trending: trendingarticles
        });
      } else if(req.isAuthenticated())   {
        res.render('pages/viewarticle', {
          username: req.user.username,
          isLoggedIn: true,
          article: article,
          fullName: fullName,
          comments: userNameCommentResult,
          relatednews: relatednews,
          trending: trendingarticles
        });
      } else if(article.category == 'News') {
          res.render('pages/viewarticlenews', {
          article: article,
          fullName: fullName,
          relatednews: relatednews,
          comments: userNameCommentResult,
          isLoggedIn: false,
          trending: trendingarticles
        });
      } else {
        res.render('pages/viewarticle', {
          article: article,
          fullName: fullName,
          comments: userNameCommentResult,
          isLoggedIn: false,
          trending: trendingarticles
        });
      }
  });


  })

  router.post('/:slug/post-comment', async (req, res) => {
    const article = await Article.findOne({ slug: req.params.slug })
    let comment= await Comment.find()

    if(req.isAuthenticated()){
        comment = new Comment({
            author: req.user.id,
            content: req.body.usercomment,
            articleid: article._id
        });
        await comment.save();

        Article.findOneAndUpdate(
            {'slug': req.params.slug},
            {$push: {comments: comment}},
            {safe: true, upsert: true, new : true},
            function(err, model) {
                console.log(err);
            }
        );
        res.redirect(`/article/${req.params.slug}`);
    } else {
        req.flash('error', 'Please login first!');
        res.redirect(`/article/${req.params.slug}`);
    }
  })

  module.exports = router;