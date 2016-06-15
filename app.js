angular.module("movieList", [])
    .controller("movieController", ["$http", movieController]);


function movieController($http) {
    var movie = this;

    movie.save = function() {
        localStorage.removeItem('items');
        localStorage.setItem('items', JSON.stringify(movie.items));
    };

    if (!movie.items) {
        localStorage.removeItem('items');

        movie.items = [{
            "Title": "Terminator 2: Judgment Day",
            "Year": "1991",
            "Rated": "R",
            "Released": "03 Jul 1991",
            "Runtime": "137 min",
            "Genre": "Action, Sci-Fi",
            "Director": "James Cameron",
            "Writer": "James Cameron, William Wisher Jr.",
            "Actors": "Arnold Schwarzenegger, Linda Hamilton, Edward Furlong, Robert Patrick",
            "Plot": "A cyborg, identical to the one who failed to kill Sarah Connor, must now protect her young son, John Connor, from a more advanced cyborg, made out of liquid metal.",
            "Language": "English, Spanish",
            "Country": "USA, France",
            "Awards": "Won 4 Oscars. Another 20 wins & 22 nominations.",
            "Poster": "https://ia.media-imdb.com/images/M/MV5BMTI4MDAwMDY3N15BMl5BanBnXkFtZTcwODIwMzMzMQ@@._V1._CR46,1,342,473_SY132_CR3,0,89,132_AL_.jpg_V1_SX300.jpg",
            "Metascore": "75",
            "imdbRating": "8.5",
            "imdbVotes": "734,005",
            "imdbID": "tt0103064",
            "Type": "movie",
            "digital": true,
            "physical": false
        }, {
            "Title": "Speed",
            "Year": "1994",
            "Rated": "R",
            "Released": "10 Jun 1994",
            "Runtime": "116 min",
            "Genre": "Action, Adventure, Crime",
            "Director": "Jan de Bont",
            "Writer": "Graham Yost",
            "Actors": "Keanu Reeves, Dennis Hopper, Sandra Bullock, Joe Morton",
            "Plot": "A young cop must prevent a bomb exploding aboard a city bus by keeping its speed above 50 mph.",
            "Language": "English",
            "Country": "USA",
            "Awards": "Won 2 Oscars. Another 14 wins & 16 nominations.",
            "Poster": "https://ia.media-imdb.com/images/M/MV5BNzczNDQyMTc2MF5BMl5BanBnXkFtZTgwNjI2NzQxMTE@._V1_SX300.jpg",
            "Metascore": "78",
            "imdbRating": "7.2",
            "imdbVotes": "258,050",
            "imdbID": "tt0111257",
            "Type": "movie",
            "digital": true,
            "physical": false

        }, {
            "Title": "The Matrix",
            "Year": "1999",
            "Rated": "R",
            "Released": "31 Mar 1999",
            "Runtime": "136 min",
            "Genre": "Action, Sci-Fi",
            "Director": "Lana Wachowski, Lilly Wachowski",
            "Writer": "Lilly Wachowski, Lana Wachowski",
            "Actors": "Keanu Reeves, Laurence Fishburne, Carrie-Anne Moss, Hugo Weaving",
            "Plot": "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
            "Language": "English",
            "Country": "USA",
            "Awards": "Won 4 Oscars. Another 33 wins & 44 nominations.",
            "Poster": "https://ia.media-imdb.com/images/M/MV5BMTkxNDYxOTA4M15BMl5BanBnXkFtZTgwNTk0NzQxMTE@._V1_SX300.jpg",
            "Metascore": "73",
            "imdbRating": "8.7",
            "imdbVotes": "1,195,371",
            "imdbID": "tt0133093",
            "Type": "movie",
            "digital": true,
            "physical": false

        }];

        movie.save();

    }
    // movie.initialize = function() {
        console.log(localStorage);
        movie.items = JSON.parse(localStorage.getItem('items'));
        // TODO: if localStorage.getItems returns undefined DO NOT parse

        movie.itemCreate = function(data) {
            movie.newMovie = {
                Title:data.Title,
                Year:data.Year ,
                Rated:data.Rated,
                Released:data.Released ,
                Runtime:data.Runtime ,
                Genre:data.Genre ,
                Director:data.Director ,
                Writer:data.Writer ,
                Actors:data.Actors ,
                Plot:data.Plot ,
                Language:data.Language ,
                Country:data.Country ,
                Awards:data.Awards ,
                Poster:data.Poster ,
                Metascore:data.Metascore ,
                imdbRating:data.imdbRating ,
                imdbVotes:data.imdbVotes ,
                imdbID:data.imdbID ,
                Type:data.Type ,
                digital: true,
                physical: false
            };

            movie.addItem(movie.newMovie);
        };

        movie.getData = function() {
            console.log("in getData");
            var title = document.getElementById('newMovieTitle').value.replace(' ', '+');
            console.log(title);
            $http({
                method: "GET",
                url: "http://www.omdbapi.com/?t=" + title + "&y=&plot=short&r=json"
            }).then(function(response) {
                movie.response = response.data;
                movie.itemCreate(movie.response);
                console.log("Getting Data", movie.response);

            });
        };
    // };

    movie.toggleEditMode = function(item) {
        item.editMode = !item.editMode;
        if (!item.editMode) {
            movie.save();
            console.log("Movie Saved!");
        }

    };







    movie.addItem = function(newMovie) {

        console.log("Adding movie!", movie.newItem, movie.items);
        movie.items.push(movie.newItem);
        console.log(movie.items);
        movie.newItem = movie.itemCreate();

        movie.save();
        movie.newItem = movie.itemCreate();
    };


    movie.deleteItem = function($index) {
        console.log("Removing movie!");
        movie.items.splice($index, 1);
        movie.save();
    };

}
