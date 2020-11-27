const bcrypt = require('bcrypt');
const express = require('express');
const multer = require("multer");
var fs = require('fs'); 
var path = require('path'); 
const User = require('../models/user');
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


module.exports = router;