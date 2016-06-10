angular.module("movieList", [])
    .controller("movieController", movieController);


function movieController() {
    var movie = this;

    // TODO: implement API

    movie.initialize = function() {
        console.log(localStorage);
        movie.items = JSON.parse(localStorage.getItem('items'));
// TODO: if localStorage.getItems returns undefined DO NOT parse
        if (!movie.items) {
            localStorage.removeItem('items');

            movie.items = [{
                "title": "Terminator 2",
                "digital": true,
                "physical": false
            }, {
                "title": "Speed",
                "digital": false,
                "physical": true
            }, {
                "title": "The Matrix",
                "digital": true,
                "physical": true
            }];

            movie.save();

        }
        console.log(movie.items);
    };

    movie.toggleEditMode= function(item){
      item.editMode = !item.editMode;
      if (!item.editMode){
        movie.save();
        console.log("Movie Saved!");
      }

    };

    movie.itemCreate = function() {
        return {
            "title": "",
            "digital": false,
            "physical": false
        };
    };



    movie.save = function() {
        localStorage.removeItem('items');
        localStorage.setItem('items', JSON.stringify(movie.items));
    };

    movie.addItem = function() {
        console.log("Adding movie!", movie.newItem, movie.items);
        movie.items.push(movie.newItem);
        console.log(movie.items);
        movie.newItem = movie.itemCreate();

        movie.save();
    };
    movie.newItem = movie.itemCreate();

    movie.deleteItem = function($index) {
        console.log("Removing movie!");
        movie.items.splice($index, 1);
        movie.save();
    };

}
