const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Article = require('../models/article');
const { request } = require('express');
const e = require('express');

router.use(express.json());

router.get('/games', async (request, response) => {
  let articles
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
    response.render('pages/games', { username: request.user.username, article: articles, isLoggedIn: true, title: 'Unplugged Games' });

  } else {
    response.render('pages/games', { isLoggedIn: false, article: articles, title: 'Unplugged Games' });
  }
});

router.get('/reviewlist', (request, response) => {
  if(request.isAuthenticated()){
    response.render('pages/reviewlist', { username: request.user.username, isLoggedIn: true, title: 'Unplugged Games' });

  } else {
    response.render('pages/reviewlist', { isLoggedIn: false, title: 'Unplugged Games' });
  }
});

router.get('/newslist', (request, response) => {
  if(request.isAuthenticated()){
    response.render('pages/newslist', { username: request.user.username, isLoggedIn: true, title: 'Unplugged Games' });

  } else {
    response.render('pages/newslist', { isLoggedIn: false, title: 'Unplugged Games' });
  }
});

router.get('/staff', (request, response) => {
  if(request.isAuthenticated()){
    response.render('pages/staff', { username: request.user.username, isLoggedIn: true, title: 'Unplugged Games' });

  } else {
    response.render('pages/staff', { isLoggedIn: false, title: 'Unplugged Games' });
  }
});


module.exports = router;