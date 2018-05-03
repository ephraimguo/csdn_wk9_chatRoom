var express = require('express');
var router = express.Router();
var User = require('./models/users');

router.get('/', function(req, res){
  const user = req.session.user || undefined;
  res.locals.title = 'fun chat room';
  res.locals.user = user;
  res.render('chat');
});

router.post('/login', function(req, res){
  const {username, password} = req.body;
  console.log(username, password);
  res.redirect('back');
});

router.post('/signup', function(req, res){
  const {username, password, confirmation} = req.body;
  console.log(username, password, confirmation);
  if(username && password && confirmation && password === confirmation){
    //
  }
  res.redirect('back');
});

module.exports = router;