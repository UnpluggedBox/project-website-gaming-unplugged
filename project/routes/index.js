const express = require('express');
const router = express.Router();

const userRoutes = require('./user');
const { request } = require('express');

router.use(express.json());

router.get('/', (request, response) => {
    response.render('layout', { pageTitle: 'Unplugged Games', template: 'index' });
  });

router.get('/about', function (req, res) {
  res.send('About this wiki');

  })

module.exports = router;