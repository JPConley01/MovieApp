angular.module("bgameList", ["collectionHelpers"])
    .controller("bgameController", ["$http", "SaveService", bgameController]);

function bgameController($http, SaveService) {
    var bgames = this;

    bgames.items = SaveService.load("bgames");


    bgames.getBgames = function(name) {
        console.log("here");
        $http.get("http://bgg-wrapper.azurewebsites.net/api/thing?query=" + name + "&exact=1").then(function(response) {
            console.log('getBgames result: ', response.data);

            var results = response.data.Items;
            var result = results.filter(function(result) {
                return result.Type === "boardgame";
            })[0];

            $http.get("http://bgg-wrapper.azurewebsites.net/api/thing?id=" + result.Id)
                .then(function(response) {
                    bgames.newBgame = response.data;
                    console.log(bgames.newBgame);
                });

        });
    };

    bgames.itemCreate = function(data) {

    };

    bgames.save = function() {
        SaveService.save("bgames", bgames.items);
    };

    bgames.addItem = function(newBgame) {
        SaveService.addItem(newBgame, bgames.items, "bgames");
    };

    bgames.deleteItem = function(item) {
        SaveService.deleteItem(item, bgames.items, "bgames");
    };


}
