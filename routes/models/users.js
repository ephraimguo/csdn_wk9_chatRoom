const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
mongoose.Promise = Promise;

const User = mongoose.model("User", {
  uName: String,
  uPass: String,
});

module.expport = User;