var express = require('express');
var jokes = require('../model/jokes');

var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'john'  });
});


router.get('/joke', function(req, res, next) {
  if(req.session.jokeCount)
  {
    req.session.jokeCount++;
  }
  else
  {
    req.session.jokeCount = 1;
  }
  console.log("single joke: " + req.session.jokeCount);
  res.render('pages/joke', { title: 'jimmy', lol : jokes.getRandomJoke});


});

router.get('/allJokes', function(req, res, next) {
  if(req.session.jokesCount)
  {
    req.session.jokesCount++;
  }
  else
  {
    req.session.jokesCount = 1;
  }
  console.log("all joke: " + req.session.jokesCount);
  res.render('pages/allJokes', { title: 'alle jokes', lol : jokes.allJokes});
});

router.get('/postJoke', function(req, res, next) {
  if(req.session.storeJokeCount)
  {
    req.session.storeJokeCount++;
  }
  else
  {
    req.session.storeJokeCount = 1;
  }
  console.log("post joke: " + req.session.storeJokeCount);
  res.render('pages/postJoke', { title: 'post dine jokes'});
});

router.get('/storeJoke', function(req, res, next) {
  console.log("her er den nye joke: " + req.body.newJoke);
  //jokes.addJoke(req.newJoke);
  res.render('pages/postJoke', { title: 'post dine jokes'});
});

router.get('/login', function(req, res, next) {

  res.render('pages/login', { title: 'login'});
});


module.exports = router;
