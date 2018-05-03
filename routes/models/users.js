const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/chatRoom');
mongoose.Promise = Promise;

// const User = mongoose.model("User", {
//   uName: String,
//   uPass: String,
//   msg:[]
// });


module.exports = {
  User:mongoose.model("User", {
    uName: String,
    uPass: String,
    msg:[]
  }),

  Msg:mongoose.model("Msg", {
    idName:String,
    msg:String
  })
};