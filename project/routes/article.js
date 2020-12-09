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
    const relatednews = await Article.find({ category: 'News'}).limit(3);
    const relatedreview = await Article.find({ category: 'Review'}).limit(3);
    const fullName = await User.findOne({"_id":{"$in":article["writer"]}});
    const trendingarticles = await Article.find().sort({visitCount: -1}).limit(4)
    if (article == null) res.redirect('/')

    db.collection('articles').updateOne(
      {slug: req.params.slug},
      {$inc: {visitCount: 1}}
      )

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
      const userid = await User.findOne({ _id: req.user.id })
      db.collection('users').updateOne(
        {_id: userid._id},
        {$addToSet: {history: article._id}},
        {safe: true, upsert: true, new : true}
        );
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
        const userid = await User.findOne({ _id: req.user.id })
        db.collection('users').updateOne(
          {_id: userid._id},
          {$addToSet: {history: article._id}},
          {safe: true, upsert: true, new : true}
          );
        res.render('pages/viewarticle', {
          username: req.user.username,
          isLoggedIn: true,
          article: article,
          fullName: fullName,
          comments: userNameCommentResult,
          relatedreview: relatedreview, 
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
          relatedreview: relatedreview, 
          trending: trendingarticles
        });
      }
  });


  })

  router.post('/:slug/post-comment', async (req, res) => {
    const article = await Article.findOne({ slug: req.params.slug })
    let comment= await Comment.find()

    if(req.isAuthenticated() && req.body.usercomment){
        comment = new Comment({
            author: req.user.id,
            content: req.body.usercomment,
            articleid: article._id
        });
        await comment.save();

        db.collection('articles').updateOne(
          {slug: req.params.slug},
          {$push: {comments: comment._id}},
          {safe: true, upsert: true, new : true}
          );

        res.redirect(`/article/${req.params.slug}`);
    } else if(!req.isAuthenticated()) {
        req.flash('error', 'Please login first!');
        res.redirect(`/article/${req.params.slug}`);
    } else {
      req.flash('error', 'Comment cant be empty!');
      res.redirect(`/article/${req.params.slug}`);
    }
  })

  module.exports = router;