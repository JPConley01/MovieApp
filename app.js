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
    movie.items = SaveService.load("items");

    movie.save = function() {
      SaveService.save("items", movie.items);
    };

    movie.itemCreate = function(data) {

    };

    movie.getMovie = function(title) {
        $http({
            method: "GET",
            url: "http://www.omdbapi.com/?t=" + title + "&y=&plot=short&r=json"
        }).then(function(response) {
            console.log('getMovie result: ', response.data);

            movie.newMovie = response.data;
        });
    };


    movie.addItem = function(newMovie) {
      SaveService.addItem(newMovie, movie.items, "items");
    };

    movie.deleteItem = function(item) {
      SaveService.deleteItem(item, movie.items, "items");
    };

}
