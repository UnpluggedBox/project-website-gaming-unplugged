const express = require('express');
const router = express.Router();
var QuillDeltaToHtmlConverter = require('quill-delta-to-html').QuillDeltaToHtmlConverter;
const { convertDeltaToHtml } = require('node-quill-converter');
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

router.get('/article/:slug', async (req, res) => {
    const article = await Article.findOne({ slug: req.params.slug })
    const relatednews = await Article.find()
    const fullName = await User.findOne({"_id":{"$in":article["writer"]}})
    if (article == null) res.redirect('/')

    if(req.isAuthenticated()){
      res.render('pages/viewarticle', {
        username: req.user.username,
        isLoggedIn: true,
        article: article,
        fullName: fullName
      });
  
    } else if (req.isAuthenticated() && (article.category == 'News'))  {
      res.render('pages/viewarticlenews', {
        username: req.user.username,
        isLoggedIn: true,
        article: article,
        fullName: fullName,
        relatednews: relatednews
      });
    } else if(article.category == 'News') {
      res.render('pages/viewarticlenews', {
        article: article,
        fullName: fullName,
        relatednews: relatednews,
        isLoggedIn: false,
      });
    } else {
      res.render('pages/viewarticle', {
        article: article,
        fullName: fullName,
        isLoggedIn: false,
      });
    }
  })

router.get('/about', function (req, res) {
  res.send('About this wiki');

  })

module.exports = router;