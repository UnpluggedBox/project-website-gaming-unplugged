const bcrypt = require('bcrypt');
const express = require('express');
const multer = require("multer");
var fs = require('fs'); 
var path = require('path'); 
const User = require('../models/user');
const Article = require('../models/article');
const router = express.Router();
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads');
     },
    filename: function (req, file, cb) {
        cb(null , file.fieldname + "-" + Date.now() + ".png");
    }
  });
var upload = multer({ storage: storage })

router.get('/:username', async (request, response) => {
  if(request.isAuthenticated()){
    const user = await User.findOne({_id: request.user.id})
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

router.get('/:username/readlist', async (request, response) => {
  if(request.isAuthenticated()){
    const user = await User.findOne({_id: request.user.id})
    response.render('pages/readlist', { 
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
    response.render('pages/profile', { title: 'Unplugged Games' });
  }
  });

  router.get('/:username/article', async (request, response) => {
    if(request.isAuthenticated()){
      const user = await User.findOne({_id: request.user.id})
      response.render('pages/article', { 
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
      response.render('pages/profile', { title: 'Unplugged Games' });
    }
    });

  router.get('/:username/articlelist', async (request, response) => {
    const article = await Article.find()
    if(request.isAuthenticated()){
      const user = await User.findOne({_id: request.user.id})
      response.render('pages/articlelist', { 
        username: user.username,
        email: user.email,
        bio: user.bio,
        firstName: user.firstName,
        lastName: user.lastName,
        image: user.image,
        genre: user.genre,
        history: user.history,
        role: user.role,
        isLoggedIn: true,
        article: article,
        title: 'Unplugged Games' });
    } else {
      response.render('pages/profile', { title: 'Unplugged Games' });
    }
    });

    router.get('/:username/article/:slug/edit', async (req, res) => {
      const docs = await Article.findOne({slug:req.params.slug})
      
      if(req.isAuthenticated()){
        const user = await User.findOne({_id: req.user.id})
        res.render('pages/articleedit', { 
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          article: docs,
          isLoggedIn: true, title: 'Unplugged Games' });
      } else {
        response.render('pages/profile', { isLoggedIn: false, title: 'Unplugged Games' });
      }

  });

router.post('/:username/update', async (req, res) => {
    const docs = await User.findOne({username:req.params.username})
          docs.username = req.body.username; 
          docs.firstName = req.body.firstname;
          docs.lastName = req.body.lastname;
          docs.bio = req.body.biography;
   try{
    docs.save();
    res.redirect(`/profile/${req.body.username}`);
   }catch(e){
   console.log(e)
    res.redirect('/');
   }
});

router.post("/:username/upload", upload.single("image"), async (req, res) => {
    const docs = await User.findOne({username:req.params.username})
        docs.username = req.params.username; 
        
        if (req.body.filename == undefined) {
          // req.flash('error', 'No picture selected!');
          res.redirect(`/profile/${req.params.username}`);
        }

    var obj = { 
      img: { 
          data: fs.readFileSync(path.join(__dirname + '/../uploads/' + req.file.filename)), 
          contentType: 'image/png'
      } 
      } 

    docs.image = obj.img;
    try{
      docs.save();
      res.redirect(`/profile/${req.params.username}`);
     }catch(e){
    console.log(e)
    res.redirect('/');
  }
  });

  router.post('/:username/article/post', upload.single("image"), async (req, res) => {
    let article = await Article.findOne({title:req.body.title})
    const docs = await User.findOne({username:req.params.username})
          docs.username = req.params.username; 

          if (req.body.filename == undefined) {
            // req.flash('error', 'No picture selected!');
            res.redirect(`/profile/${req.params.username}`);
          }
  
      var obj = { 
        img: { 
            data: fs.readFileSync(path.join(__dirname + '/../uploads/' + req.file.filename)), 
            contentType: 'image/png'
        } 
        } 

        console.log(req.body.content)

        article = new Article({
          title: req.body.title,
          writer: req.user.id,
          genre: req.body.genre,
          summary: req.body.summary,
          content: req.body.content,
          category: req.body.category,
          image: obj.img
        });
          await article.save();
          res.redirect(`/profile/${req.params.username}/article`);

    });

    router.post('/:username/article/:slug/edit', upload.single("image"), async (req, res) => {
      const docs = await Article.findOne({slug:req.params.slug})

        if (req.body.filename == undefined) {
          // req.flash('error', 'No picture selected!');
          res.redirect(`/profile/${req.params.username}`);
        }

      var obj = { 
        img: { 
            data: fs.readFileSync(path.join(__dirname + '/../uploads/' + req.file.filename)), 
            contentType: 'image/png'
        } 
      } 
            docs.title = req.body.title; 
            docs.category = req.body.category;
            docs.summary = req.body.summary;
            docs.content = req.body.content;
            docs.image = obj.img;
     try{
      docs.save();
      res.redirect(`/profile/articlelist`);
     }catch(e){
     console.log(e)
      res.redirect('/');
     }
  });


module.exports = router;