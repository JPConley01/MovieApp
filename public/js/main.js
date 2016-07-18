angular.module('app', ['collectionHelpers']);

angular.module('app')
    .controller('mainController', ['$scope', '$http', 'SaveService', function($scope, $http, SaveService) {
        $scope.signup = function() {
            localStorage.setItem('currentUser', $scope.loginForm.username);

            $http({
                method: 'POST',
                url: '/signup',
                data: $scope.signupForm
            }).then(function(returnData) {
                // console.log(returnData)
                if (returnData.data.success) {
                    window.location.href = "/movies";
                }
            });
        };

        $scope.login = function() {
            localStorage.setItem('currentUser', $scope.loginForm.username);

            $http({
                method: 'POST',
                url: '/login',
                data: $scope.loginForm
            }).then(function(returnData) {
                // console.log("Return Data", returnData);
                if (returnData.data.success) {
                    console.log("Here success");
                    window.location.href = "/movies";
                } else {
                    console.log(returnData);
                }
            });
        };

    }]);
