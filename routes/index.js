var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/1', function(req, res) {
  res.render('ChatIndex', { title: 'Express' });
});


module.exports = router;
