var express = require('express');
var router = express.Router();
// var User = require('./models/users');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/chatRoom');
mongoose.Promise = Promise;
const User = mongoose.model("User", {
  uName: String,
  uPass: String,
});



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

router.post('/signup', async function(req, res){
  // await User.remove();
  const {username, password, confirmation} = req.body;
  console.log(username, password, confirmation);
  let finding = await User.find({uName:username});
  console.log(finding, 'compare the username only');
  if(finding.length===0 && username && password && confirmation && password === confirmation){
    await User.create([
      {
        uName: username,
        uPass: password
      }
    ]);
  }
  else{
    console.log('signup failed');
  }
  console.log('--------');
  console.log(await User.find(), 'user find all');
  res.redirect('back');
});

module.exports = router;