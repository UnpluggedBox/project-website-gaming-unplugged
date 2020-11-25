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

router.get('/asd', function (req, res) {
    res.send('About the');
  })

// router.post('/register', async (req, res) => {
//     // Check if this user already exists
//     let user = await User.findOne({ email: req.body.email });
//     let uname = await User.findOne({ username: req.body.username });
//     if (user) {
//       req.flash("error","Email is already registered");
//       res.locals.messages = req.flash();
//     } else {
//         // Insert the new user if they do not exist yet
//         user = new User({
//             username: req.body.username,
//             email: req.body.email,
//             password: req.body.password
//         });
//         const salt = await bcrypt.genSalt(10);
//         user.password = await bcrypt.hash(user.password, salt);
//         await user.save();
//         res.send(user);
//     }
// });

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
          req.flash('error', 'No picture selected!');
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