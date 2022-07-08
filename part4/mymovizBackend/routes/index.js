var express = require('express');
var router = express.Router();
var request = require("sync-request");

var movieModel = require('../models/movies');
var myAPIKey = "3791e23652e0c8a6dd7a2eea7435a413";

// Home Page
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// Movies from TheMovieDB
router.get('/new-movies', function(req, res, next) {

  var requete = request("GET", "https://api.themoviedb.org/3/discover/movie?api_key="+ myAPIKey +"&language=en-US&region=US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&year=2021");
  var dataAPI = JSON.parse(requete.body);

  res.json({ moviesFromAPI : dataAPI.results });
});


// Add movies to MongoDB
router.post('/wishlist-movie', async function(req,res,next){
  var newMovie = new movieModel ({
    movieName : req.body.name,
    movieImg : req.body.img, 
  });
  var movieSave = await newMovie.save();
  // var result = false
  // if(movieSave.movieName){
  //   result = true
  // }
  res.json({ movieSave });
})

// Delete Movie
router.delete('/wishlist-movie/:name', async function(req, res) {
  var deleteMovie = await movieModel.deleteOne({ movieName : req.params.name });
  // var result = false
  // if(deleteMovie.deletedCount == 1){
  //   result = true
  // }
    res.json({ deleteMovie });
});


// Load Movies
router.get('/wishlist-movie', async function(req, res) {
  var movieList = await movieModel.find();
  res.json({ movieList });
});

module.exports = router;