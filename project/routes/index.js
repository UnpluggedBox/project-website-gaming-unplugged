const express = require('express');
const router = express.Router();

const userRoutes = require('./user');
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

router.get('/about', function (req, res) {
  res.send('About this wiki');

  })

module.exports = router;