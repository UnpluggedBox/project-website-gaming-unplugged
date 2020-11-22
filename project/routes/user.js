const bcrypt = require('bcrypt');
const express = require('express');
const User = require('../models/user');
const router = express.Router();

router.get('/asd', function (req, res) {
    res.send('About the');
  })

router.post('/register', async (req, res) => {
    // Check if this user already exisits
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).send('That user already exisits!');
    } else {
        // Insert the new user if they do not exist yet
        user = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        await user.save();
        res.send(user);
    }
});

// router.post('/login', function(req, res, next) {
//     passport.authenticate('local', function(err, user, info) {
//       if (err) { return next(err); }
//       if (!user) { 
//           res.status(401);
//           res.end(info.message);
//           return;
//       }
//     })(req, res, next);
//   });

// router.post('/login', (req, res, next) => {
//     passport.authenticate('local', {
//       successRedirect: '/staff',
//       failureRedirect: '/reviewlist',
//       failureFlash: 'Invalid username or password.'
//     })(req, res, next);
//   });

module.exports = router;