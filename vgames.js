angular.module("vgameList", ["collectionHelpers"])
    .controller("vgameController", ["$http", "SaveService", vgameController]);

function vgameController($http, SaveService) {
    var vgame = this;

    vgame.items = SaveService.load("vgames");


    vgame.getVgames = function(name) {
        console.log("here");
        $http.get("http://bgg-wrapper.azurewebsites.net/api/thing?query=" + name + "&exact=1").then(function(response) {
            console.log('getVgames result: ', response.data);

            var results = response.data.Items;
            var result = results.filter(function(result) {
                return result.Type === "videogame";
            })[0];

            $http.get("http://bgg-wrapper.azurewebsites.net/api/thing?id=" + result.Id)
              .then(function(response){
                vgame.newVgame = response.data;
                console.log(vgame.newVgame);
              });

        });
    };

    vgame.itemCreate = function(data) {

    };

    vgame.save = function() {
        SaveService.save("vgames", vgame.items);
    };

    vgame.addItem = function(newVgame) {
        SaveService.addItem(newVgame, vgame.items, "vgames");
    };

    vgame.deleteItem = function(item) {
        SaveService.deleteItem(item, vgame.items, "vgames");
    };


}
