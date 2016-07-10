angular.module("movieList", ["collectionHelpers"])
    .controller("movieController", ["$http","SaveService", movieController]);

function movieController($http, SaveService) {
    var movie = this;

    movie.sortType = '';
    movie.newMovie = {};
    movie.dummy = {
        Title: 0,
        Year: 0,
        Rated: 0,
        Released: 0,
        Runtime: 0,
        Genre: 0,
        Director: 0,
        Writer: 0,
        Actors: 0,
        Plot: 0,
        Language: 0,
        Country: 0,
        Awards: 0,
        Poster: 0,
        Metascore: 0,
        imdbRating: 0,
        imdbVotes: 0,
        imdbID: 0,
        Type: 0,
    };
    movie.dummyKeys = Object.keys(movie.dummy);
    // console.log(localStorage);
    movie.user = {};
    movie.items = [];

    movie.init = function() {
      SaveService.load()
        .then(function(response) {
          console.log(response);
            movie.user = response.data;

            console.log(movie.user);

            movie.items = movie.user.mcollection;
        });
    };


    movie.save = function() {
      SaveService.save(movie.user);
    };

    movie.itemCreate = function(data) {

    };

    movie.getMovie = function(title) {
        $http({
            method: "GET",
            url: "https://www.omdbapi.com/?t=" + title + "&y=&plot=short&r=json"
        }).then(function(response) {
            console.log('getMovie result: ', response.data);

            movie.newMovie = response.data;
        });
    };


    movie.addItem = function(newMovie) {
      console.log(movie.items);
      console.log(movie.user.mcollection);

      SaveService.addItem(newMovie, movie.items, movie.user);
    };

    movie.deleteItem = function(item) {
      SaveService.deleteItem(item, movie.items, movie.user);
    };

}
