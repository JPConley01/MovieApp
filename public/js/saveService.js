angular.module("collectionHelpers", [])
    .factory("SaveService", [function() {
        return {
            load: function(name) {
                var localItems = localStorage.getItem(name);

                if (localItems != null) {
                    var items = JSON.parse(localItems);

                    if (!items) {
                        localStorage.removeItem(name);

                        items = [];
                    }

                    return items;
                }

                return [];
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
