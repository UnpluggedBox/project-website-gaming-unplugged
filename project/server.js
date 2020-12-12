var ObjectID = require('mongodb').ObjectID
var passport = require('passport');
const { request, response } = require("express");
const bcrypt = require('bcrypt');
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
const articles = require('./routes/article');
const userid = require('./models/user');
const articleid = require('./models/article');
const Carousel = require('./models/carousel');
const e = require('express');
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
app.use(flash());
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
  const article = await articleid.find().sort({createdAt: -1}).limit(4)
  const trendingarticles = await articleid.find().sort({visitCount: -1}).limit(4)
  const carousel = await Carousel.find()
  if(request.isAuthenticated()){
    const user = await userid.findOne({_id: request.user.id})
    console.log(user)
    response.render('pages/homepage', { 
      username: user.username,
      isLoggedIn: true,
      trending: trendingarticles,
      carousel: carousel, 
      article: article,
      pageTitle: 'Unplugged Games'});
  } else {
    response.render('pages/homepage', { isLoggedIn: false, article: article, carousel: carousel,  trending: trendingarticles, pageTitle: 'Unplugged Games'});
  }
});

// route login

app.get('/login', (request, response) => {
  response.render('pages/login', { isLoggedIn: false, pageTitle: 'Unplugged Games' });
});


app.post('/login', (req, res) => passport.authenticate('local', { 
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true})(req, res));

  app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });

// route register

app.get('/register', (request, response) => {

  response.render('pages/register', { isLoggedIn: false, pageTitle: 'Unplugged Games' });
});

app.post('/register', async (req, res) => {
  // Check if this user already exists
  let user = await userid.findOne({ email: req.body.email });
  let uname = await userid.findOne({ username: req.body.username });
  if (user) {
    req.flash('error', 'Email already exists!');
    res.redirect('/register');
    } else if (uname) {
      req.flash('error', 'Username already taken!');
      res.redirect('/register');
    } else {
          // Insert the new user if they do not exist yet
          user = new userid({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        await user.save();
        res.redirect('/login');
  }
});

app.use('/', routes);
app.use('/profile', users);
app.use('/article', articles);


app.listen(port, () => {
  console.log(`express server listening on port ${port}! `);
});

mongoose.connect('mongodb://127.0.0.1:27017/db-unplugged-gaming', {
  useUnifiedTopology: true,
  useNewUrlParser:true,
  useCreateIndex:true,
  useFindAndModify:true
});
const db = mongoose.connection;

db.once("open", () => {
  console.log("Mongoose successfully connected.");
});

db.on('error', console.error.bind(console, 'MongoDB connection failed!'));