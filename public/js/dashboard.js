angular.module('app', [])


angular.module('app')
    .controller('mainController', ['$scope', '$http', function($scope, $http){
        $http({
            method : 'GET',
            url    : '/api/me',
        }).then(function(returnData){
            console.log(returnData)
            if ( returnData.data.user ) {
                $scope.user = returnData.data.user
            }
        })        
    }])