var ObjectID = require('mongodb').ObjectID
var passport = require('passport');
var crypto = require('crypto');
const { request } = require("express");
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
app.use( bodyParser.urlencoded({ extended: true }) );
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
  response.render('pages/homepage', { title: 'Unplugged Games' });
});

// app.get('/games', (request, response) => {
//   response.render('pages/games', { title: 'Unplugged Games' });
// });

app.get('/reviewlist', (request, response) => {
  response.render('pages/reviewlist', { pageTitle: 'Unplugged Games' });
});

app.get('/newslist', (request, response) => {
  response.render('pages/newslist', { pageTitle: 'Unplugged Games' });
});


app.get('/staff', (request, response) => {
  response.render('pages/staff', { pageTitle: 'Unplugged Games' });
});

app.post('/login', (req, res) => passport.authenticate('local', { successRedirect: '/staff', failureRedirect: '/newslist', failureFlash: true})(req, res));
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

  response.render('pages/register', { pageTitle: 'Unplugged Games' });
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