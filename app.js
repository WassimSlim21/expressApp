var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var bodyParser = require('body-parser');
const port = 4000;
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');



app.use(logger('dev'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.get('/api/name/:user_name/:userlastname', function(req,res) {
  res.status(200);
  res.set('Content-type', 'text/html');
  res.send('<html><body>' +
  '<h1>Hello ' + req.params.user_name + req.params.userlastname + '</h1>' +
  '</body></html>'
  );
});

app.get('/api/users', function(req, res) {
  const user_id = req.query.id;
  const token = req.query.token;
  const geo = req.query.geo;

  res.send({
    'user_id': user_id,
    'token': token,
    'geo': geo
  });
});

app.post('/api/users', (req, res,next) => {
console.log(req.body);
  if(req.body){
      const user_id = req.body.id;
      const token = req.body.token;
      const geo = req.body.geo;
      
  res.send({
      'user_id': user_id,
      'token': token,
      'geo': geo
    });
  }


});

app.listen(port || 3000, function() {
  console.log('The server is running, ' +
      ' please, open your browser at http://localhost:%s', 
      port);
});



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

module.exports = app;
