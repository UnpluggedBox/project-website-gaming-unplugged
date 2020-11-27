const express = require('express');
const router = express.Router();
var QuillDeltaToHtmlConverter = require('quill-delta-to-html').QuillDeltaToHtmlConverter;
const { convertDeltaToHtml } = require('node-quill-converter');
const User = require('../models/user');
const Article = require('../models/article');
const { request } = require('express');

router.use(express.json());

// router.get('/', (request, response) => {
//     response.render('layout', { pageTitle: 'Unplugged Games', template: 'index' });
//   });

router.get('/games', (request, response) => {
  if(request.isAuthenticated()){
    response.render('pages/games', { username: request.user.username, isLoggedIn: true, title: 'Unplugged Games' });

  } else {
    response.render('pages/games', { isLoggedIn: false, title: 'Unplugged Games' });
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
    const user = await User.find()
    if (article == null) res.redirect('/')

    //   var delta =  [
    //     article.content.replace('{"ops":[',''),
    //     article.content.replace(']}','')
    // ];
    
    // var cfg = {};
    
    // var converter = new QuillDeltaToHtmlConverter(delta.ops);
    
    // var html = converter.convert(); 

    res.render('pages/viewarticle', {
      article: article,
      isLoggedIn: false,
    })
  }
)

router.get('/about', function (req, res) {
  res.send('About this wiki');

  })

module.exports = router;