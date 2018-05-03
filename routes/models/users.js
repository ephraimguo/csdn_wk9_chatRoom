const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/chatRoom');
mongoose.Promise = Promise;

const User = mongoose.model("User", {
  uName: String,
  uPass: String,
});

module.exports = User;