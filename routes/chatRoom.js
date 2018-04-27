var express = require('express');
var router = express.Router();
var User = require('./models/users');

router.get('/', function(req, res){
  const user = req.session.user || undefined;
  res.local.title = 'fun chat room';
  res.local.user = user;
  res.render('chat');
});

module.exports = router;