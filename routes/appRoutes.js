const express = require('express');

const appController = require('../controllers/appController');

const router = express.Router();

router.get('/', appController.getIndex);

router.get('/test', (req, res, next) => {
  res.send('App updated successfully!');
  console.log('Test concluded successfully!')
})

module.exports = router;