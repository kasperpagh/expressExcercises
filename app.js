var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var jokes = require('./model/jokes');
var session = require('express-session');




var routes = require('./routes/index');
//var joke = require('./routes/joke');
var users = require('./routes/users');



var app = express();
//haha.getRandomJoke()

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret:'secret_3162735',saveUninitialized:true, resave: true}));

app.use(function(req, res, next){
    var sess = req.session;
    console.log("her er sess: " + sess.userName);
    console.log("her er url: " + req.url);
    if(req.url.indexOf("/api/") >= 0)
    {
        console.log("we ignore, body: "+ req.body);
        return next();
    }
    if(sess.userName)
    {
        console.log("Jeg har usr: " + sess.userName);
        res.locals.userName = sess.userName;
        return next();
    }
    else
    {
        if(req.body.userName)
        {
            sess.userName = req.body.userName;
            res.locals.userName = sess.userName;
            return res.redirect("/");
        }
        else
        {
            req.url = "/login";
            return next();
        }
    }

});



app.use('/', routes);
app.use('/joke', routes);
//app.use('/joke', joke);
app.use('/users', users);

app.post('/api/joke', function(req, res)
{
    console.log("i post, her er req.body: " + req.body.joke);
    jokes.allJokes.push(req.body.joke);
    res.send("cool beans");

});


app.post('/storeJoke', function(req, res)
{
    console.log("vi er i app udner post!");
    jokes.addJoke(req.body.newJoke);

    console.log("antal jokes: " + jokes.allJokes.length);
    res.render('pages/postJoke', { title: 'post dine jokes'});


});

app.get('/api/joke/random', function(req, res)
{
    res.send(jokes.getRandomJoke.toString());
});

app.get('/api/jokes', function(req, res)
{
    res.send(jokes.allJokes.toString());
});



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});



// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
