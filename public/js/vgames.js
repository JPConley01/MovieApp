angular.module("vgameList", ["collectionHelpers"])
    .controller("vgameController", ["$http", "SaveService", vgameController]);

function vgameController($http, SaveService) {
    var vgame = this;

    vgame.user = {};
    vgame.items = [];

    vgame.init = function() {
        SaveService.load()
            .then(function(response) {
                vgame.user = response.data;

                vgame.items = vgame.user.vcollection;
            });
    };


    vgame.getVgames = function(name) {
        console.log("here");
        $http.get("https://bgg-wrapper.azurewebsites.net/api/thing?query=" + name + "&exact=1").then(function(response) {
            console.log('getVgames result: ', response.data);

            var results = response.data.Items;
            var result = results.filter(function(result) {
                return result.Type === "videogame";
            })[0];

            $http.get("https://bgg-wrapper.azurewebsites.net/api/thing?id=" + result.Id)
                .then(function(response) {
                    vgame.newVgame = response.data;
                    console.log(vgame.newVgame);
                });

        });
    };

    vgame.itemCreate = function(data) {

    };

    vgame.save = function() {
        SaveService.save(vgame.user);
    };

    vgame.addItem = function(newVgame) {
        SaveService.addItem(newVgame, vgame.items, vgame.user);
    };

    vgame.deleteItem = function(item) {
        SaveService.deleteItem(item, vgame.items, vgame.user);
    };


}
