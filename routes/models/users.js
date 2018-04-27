const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
mongoose.PRomise = Promise;

const User = mongoose.model("User", {
  uName: String,
  uPass: String,
});

module.expport = User;