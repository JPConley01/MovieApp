angular.module("collectionHelpers", [])
    .factory("SaveService", ['$http', function($http) {
        var apiBaseUrl = 'https://allthethings.site/';

        return {
            load: function() {
                var username = localStorage.getItem('currentUser');

                return $http.get(apiBaseUrl + 'user/' + username);
            },

            save: function(data) {
                return $http.put(apiBaseUrl + 'user', data)
                    .then(function(response) {
                        // console.log('you saved this user', data);
                    });
            },

            addItem: function(newItem, items, user) {
                items.push(newItem);

                this.save(user);
            },

            deleteItem: function(item, items, user) {
                var index = items.indexOf(item);

                items.splice(index, 1);

                this.save(user);
            }
        };
    }]);
