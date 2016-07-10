angular.module("collectionHelpers", [])
    .factory("SaveService", ['$http', function($http) {
      var apiBaseUrl = 'https://allthethings.site/html/';

        return {
            load: function() {
              var username = localStorage.getItem('currentUser');

              var endpoint = apiBaseUrl + 'user/' + username;

              $http.get(endpoint)
                .then(function(response) {
                  console.log(response);

                  var user = response.data;
                  console.log(user);
                });

                // var localItems = localStorage.getItem(name);
                //
                // if (localItems != null) {
                //     var items = JSON.parse(localItems);
                //
                //     if (!items) {
                //         localStorage.removeItem(name);
                //
                //         items = [];
                //     }
                //
                //     return items;
                // }
                //
                // return [];
            },

            save: function(name, data) {
                localStorage.removeItem(name);
                localStorage.setItem(name, JSON.stringify(data));
            },

            addItem: function(newItem, items, name) {
                items.push(newItem);

                this.save(name, items);
            },

            deleteItem: function(item, items, name) {
                var index = items.indexOf(item);

                items.splice(index, 1);

                this.save(name, items);
            }
        };
    }]);