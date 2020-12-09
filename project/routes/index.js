const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Article = require('../models/article');
const { request } = require('express');
const e = require('express');
const { db } = require('../models/user');

router.use(express.json());

router.get('/games', async (request, response) => {
  const trendingarticles = await Article.find().sort({visitCount: -1}).limit(4)
  let articles = []
    if(request.query.search) {
    await Article.find({"title":{'$regex':request.query.search,"$options":"i"}},function(err, result){
        if(err){
            console.log(err);
        } else {
            articles = result
        }
    })
  }


  //   if(request.query.search) {
  //     await Article.find({
  //       "$or": [
  //       { "title" : {'$regex': request.query.search, "$options":"i"}},
  //       { "genre" : {'$regex': request.query.search, "$options":"i"}} ]

  //     }), function(err, result) {
  //       if(err){
  //         console.log(err);
  //     } else {
  //     articles = result;
  //     }
  //   }
  // }
  
  if(request.isAuthenticated()){
    response.render('pages/games', { username: request.user.username, article: articles, isLoggedIn: true, trending: trendingarticles, title: 'Unplugged Games' });

  } else {
    response.render('pages/games', { isLoggedIn: false, article: articles, trending: trendingarticles, title: 'Unplugged Games' });
  }
});

router.get('/reviewlist', async (request, response) => {
  var perPage = 6
  var page = parseInt(request.query.page) >= 1 ? parseInt(request.query.page) : 1;
  let qty =  await Article.countDocuments().exec()
  const trendingarticles = await Article.find().sort({visitCount: -1}).limit(4)
  const articles = await Article
  .find({ category: 'Review'})
  .sort({createdAt: -1})
  .skip((perPage * page) - perPage)
  .limit(perPage)
  if(request.isAuthenticated()){
    response.render('pages/reviewlist', { username: request.user.username, trending: trendingarticles, article: articles, current: page, pages: Math.ceil(qty / perPage), isLoggedIn: true, title: 'Unplugged Games' });

  } else {
    response.render('pages/reviewlist', { isLoggedIn: false, trending: trendingarticles, article: articles, current: page, pages: Math.ceil(qty / perPage), title: 'Unplugged Games' });
  }
});

router.get('/newslist', async (request, response) => {
  const trendingarticles = await Article.find().sort({visitCount: -1}).limit(4)
  const articles = await Article.find({ category: 'News'}).sort({createdAt: -1}).limit(6)
  if(request.isAuthenticated()){
    response.render('pages/newslist', { username: request.user.username, trending: trendingarticles, article: articles, isLoggedIn: true, title: 'Unplugged Games' });

  } else {
    response.render('pages/newslist', { isLoggedIn: false, trending: trendingarticles, article: articles, title: 'Unplugged Games' });
  }
});

router.get('/staff', async (request, response) => {
  const trendingarticles = await Article.find().sort({visitCount: -1}).limit(4)
  if(request.isAuthenticated()){
    response.render('pages/staff', { username: request.user.username, trending: trendingarticles, isLoggedIn: true, title: 'Unplugged Games' });

  } else {
    response.render('pages/staff', { isLoggedIn: false, trending: trendingarticles, title: 'Unplugged Games' });
  }
});


module.exports = router;