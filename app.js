var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');

const session = require('express-session');
const FileStore = require('session-file-store')(session);
const sessionMdlWare = session({
  store: new FileStore(),
  secret: 'keyboard cat',
  cookie: {maxAge: 60000*5}
});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var chat = require('./routes/chatRoom');

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
server.listen(3000);

io.on('connection', function(socket){
  console.log('************* connection received ************');
  socket.emit('sending', 'connection successful message');
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sessionMdlWare); // added session middleware
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/chat', chat);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// module.exports = app;
