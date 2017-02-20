var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/searchUser', function(req, res) {
  if(req.body.name==''){
    res.json({error:null})
  }else{
    console.log(typeof userList);
    res.json({error:11})
  }
});

module.exports = router;
