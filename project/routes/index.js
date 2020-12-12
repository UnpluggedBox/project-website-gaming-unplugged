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

  
  if(request.isAuthenticated()){
    response.render('pages/games', { username: request.user.username, article: articles, isLoggedIn: true, trending: trendingarticles, title: 'Unplugged Games' });

  } else {
    response.render('pages/games', { isLoggedIn: false, article: articles, trending: trendingarticles, title: 'Unplugged Games' });
  }
});

router.get('/reviewlist', async (request, response) => {
  const trendingarticles = await Article.find().sort({visitCount: -1}).limit(4)
  const page = parseInt(request.query.page) >= 1 ? parseInt(request.query.page) : 1;
  const limit = 6
  const pagination = {}
  const startIndex = (page -1) * limit
  const endIndex = page * limit
  let articles
  let jumlah =  await Article.countDocuments().exec()

     await Article.find({category: 'Review'}).limit(limit)
      .skip(startIndex)
      .then((results) => {
        articles = results
        if (endIndex < jumlah)
        {
         pagination.next = {
             page : page +1,
             limit: limit
         }
        }
        if (startIndex > 0){
         pagination.previous = {
             page: page-1,
             limit: limit
         }
        }  
      })
      .catch((err) => {
        console.log(err)
        res.redirect('/')
      })
 


  if(request.isAuthenticated()){
    response.render('pages/reviewlist', { username: request.user.username, trending: trendingarticles, article: articles, pagination:pagination, currentpage:page, isLoggedIn: true, title: 'Unplugged Games' });

  } else {
    response.render('pages/reviewlist', { isLoggedIn: false, trending: trendingarticles, article: articles, pagination:pagination, currentpage:page, title: 'Unplugged Games' });
  }
});

router.get('/newslist', async (request, response) => {
  const trendingarticles = await Article.find().sort({visitCount: -1}).limit(4)
  const page = parseInt(request.query.page) >= 1 ? parseInt(request.query.page) : 1;
  const limit = 6
  const pagination = {}
  const startIndex = (page -1) * limit
  const endIndex = page * limit
  let articles
  let jumlah =  await Article.countDocuments().exec()

    await Article.find({category: 'News'}).limit(limit)
    .skip(startIndex)
    .then((results) => {
      articles = results
      if (endIndex < jumlah)
      {
      pagination.next = {
          page : page +1,
          limit: limit
      }
      }
      if (startIndex > 0){
      pagination.previous = {
          page: page-1,
          limit: limit
      }
      }  
    })
    .catch((err) => {
      console.log(err)
      res.redirect('/')
    })

  if(request.isAuthenticated()){
    response.render('pages/newslist', { username: request.user.username, trending: trendingarticles, article: articles, pagination:pagination, currentpage:page, isLoggedIn: true, title: 'Unplugged Games' });

  } else {
    response.render('pages/newslist', { isLoggedIn: false, trending: trendingarticles, article: articles, pagination:pagination, currentpage:page, title: 'Unplugged Games' });
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