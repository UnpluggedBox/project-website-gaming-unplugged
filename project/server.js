var ObjectID = require('mongodb').ObjectID
var passport = require('passport');
var crypto = require('crypto');
const { request, response } = require("express");
const express = require('express');
const flash = require('express-flash')
const session = require('express-session');
const mongoose = require('mongoose');
const bodyParser =  require('body-parser');
require('dotenv').config();

const path = require('path');
const routes = require('./routes/index');
const users = require('./routes/user');
const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use( bodyParser.urlencoded({ extended: false }) );
app.use(flash())
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));
require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());


app.get('/', (request, response) => {
  if(request.isAuthenticated()){
    response.render('pages/homepage', { username: request.user.username, isLoggedIn: true, title: 'Unplugged Games' });

  } else {
    response.render('pages/homepage', { isLoggedIn: false, title: 'Unplugged Games' });
  }
});

// app.get('/games', (request, response) => {
//   response.render('pages/games', { title: 'Unplugged Games' });
// });

app.get('/reviewlist', (request, response) => {
  if(request.isAuthenticated()){
    response.render('pages/reviewlist', { username: request.user.username, isLoggedIn: true, title: 'Unplugged Games' });

  } else {
    response.render('pages/reviewlist', { isLoggedIn: false, title: 'Unplugged Games' });
  }
});

app.get('/newslist', (request, response) => {
  if(request.isAuthenticated()){
    response.render('pages/newslist', { username: request.user.username, isLoggedIn: true, title: 'Unplugged Games' });

  } else {
    response.render('pages/newslist', { isLoggedIn: false, title: 'Unplugged Games' });
  }
});


app.get('/staff', (request, response) => {
  if(request.isAuthenticated()){
    response.render('pages/staff', { username: request.user.username, isLoggedIn: true, title: 'Unplugged Games' });

  } else {
    response.render('pages/staff', { isLoggedIn: false, title: 'Unplugged Games' });
  }
});

app.get('/login', (request, response) => {
  response.render('pages/login', { isLoggedIn: false, pageTitle: 'Unplugged Games' });
});

// app.post('/login', function(req, res, next) {
//   passport.authenticate('local', function(err, user, info) {
//     if (err) { return next(err); }
//     // Redirect if it fails

//     if (!user) { return res.redirect('/login'); }
//     req.logIn(user, function(err) {
//       if (err) { return next(err); }
//       // Redirect if it succeeds
//       return res.redirect('/users/' + user.username);
//     });
//   })(req, res, next);
// });

app.post('/login', (req, res) => passport.authenticate('local', { 
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true})(req, res));

// app.post('/login', function(req, res, next) {
//   console.log(req.url);
//   passport.authenticate('local', function(err, user, info) {
//       console.log("authenticate");
//       console.log(err);
//       console.log(user);
//       console.log(info);
//   })(req, res, next);
// });


// app.get('/login', (request, response) => {
//   response.render('pages/login', { pageTitle: 'Unplugged Games' });
// });

app.get('/register', (request, response) => {

  response.render('pages/register', { isLoggedIn: false, pageTitle: 'Unplugged Games' });
});


// app.post('/register', async (request, response) => {

//   return request.body;
// });

app.use('/', routes);
app.use('/user', users);


app.listen(port, () => {
  console.log(`express server listening on port ${port}! `);
});

mongoose.connect('mongodb://127.0.0.1:27017/db-unplugged-gaming', {useUnifiedTopology: true,
  useNewUrlParser:true,
  useCreateIndex:true
});
const db = mongoose.connection;

db.once("open", () => {
  console.log("Mongoose successfully connected.");
});

db.on('error', console.error.bind(console, 'MongoDB connection failed!'));