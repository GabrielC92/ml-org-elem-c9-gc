// ************ Require's ************
var express = require('express');
var router = express.Router();

// ************ Controller Require ************
const { home, search } = require('../controllers/mainController');

router.get('/', home); 
router.get('/search', search); 

module.exports = router;
