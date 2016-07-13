angular.module("bgameList", ["collectionHelpers"])
    .controller("bgameController", ["$http", "SaveService", bgameController]);

function bgameController($http, SaveService) {
    var bgames = this;

    bgames.sortType = '';
    bgames.newVgame = {};
    bgames.dummy = {
      Description:0,
      Type:0,
      Id: 0,
      Name: {
      Type:0,
      Value: 0
    }
};

  bgames.dummyKeys = Object.keys(bgames.dummy);
    bgames.user = {};
    bgames.items = [];

    bgames.init = function() {
        SaveService.load()
            .then(function(response) {
                bgames.user = response.data;

                bgames.items = bgames.user.bcollection;
            });
    };

    bgames.getBgames = function(name) {
        console.log("here");
        $http.get("https://bgg-wrapper.azurewebsites.net/api/thing?query=" + name + "&exact=1").then(function(response) {
            console.log('getBgames result: ', response.data);

            var results = response.data.Items;
            var result = results.filter(function(result) {
                return result.Type === "boardgame";
            })[0];

            $http.get("https://bgg-wrapper.azurewebsites.net/api/thing?id=" + result.Id)
                .then(function(response) {
                    bgames.newBgame = response.data;
                    console.log(bgames.newBgame);
                });

        });
    };

    bgames.itemCreate = function(data) {


    };

    bgames.save = function() {
        SaveService.save(bgames.user);
    };

    bgames.addItem = function(newBgame) {
        SaveService.addItem(newBgame, bgames.items, bgames.user);

    };

    bgames.deleteItem = function(item) {
        SaveService.deleteItem(item, bgames.items, bgames.user);
    };

}
