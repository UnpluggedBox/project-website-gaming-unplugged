var ObjectID = require('mongodb').ObjectID
var passport = require('passport');
const { request, response } = require("express");
const express = require('express');
const flash = require('express-flash')
const session = require('express-session');
const mongoose = require('mongoose');
const multer = require("multer");
var fs = require('fs'); 
var path = require('path');
const bodyParser =  require('body-parser');
require('dotenv').config();

const routes = require('./routes/index');
const users = require('./routes/user');
const userid = require('./models/user');
//const user = require('./models/user');
const app = express();
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, 'uploads');
   },
  filename: function (req, file, cb) {
      cb(null , file.fieldname + "-" + Date.now());
  }
});
var upload = multer({ storage: storage })
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


app.get('/', async (request, response) => {
  if(request.isAuthenticated()){
    const user = await userid.findOne({_id: request.user.id})
    console.log(user)
    response.render('pages/homepage', { 
      username: user.username,
      isLoggedIn: true, title: 'Unplugged Games' });

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

app.get('/profile/:username', async (request, response) => {
  if(request.isAuthenticated()){
    const user = await userid.findOne({_id: request.user.id})
    response.render('pages/profile', { 
      username: user.username,
      email: user.email,
      bio: user.bio,
      firstName: user.firstName,
      lastName: user.lastName,
      image: user.image,
      genre: user.genre,
      history: user.history,
      role: user.role,
      isLoggedIn: true, title: 'Unplugged Games' });
  } else {
    response.render('pages/profile', { isLoggedIn: false, title: 'Unplugged Games' });
  }
});



app.get('/login', (request, response) => {
  response.render('pages/login', { isLoggedIn: false, pageTitle: 'Unplugged Games' });
});

// login post

app.post('/login', (req, res) => passport.authenticate('local', { 
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true})(req, res));

  app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });


app.get('/register', (request, response) => {

  response.render('pages/register', { isLoggedIn: false, pageTitle: 'Unplugged Games' });
});


app.use('/', routes);
app.use('/profile', users);


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