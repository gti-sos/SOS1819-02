/* global angular */

var app = angular.module("AppManager");

app.controller("BeerCtrl", ["$scope", "$http", function($scope, $http) {


    console.log("List Beer Controller initialized.");

    var aux = "proxyBeer/api/v1/beer-consumed-stats";
    refresh();

    function refresh() {

        console.log("Requesting to <" + aux + ">...");
        $http
            .get(aux)
            .then(function(response) {
                console.log("Data received:" + JSON.stringify(response.data, null, 2));

                $scope.beer_consumeds = response.data;
                console.log("$scope.beer_consumeds");
            });
    }

}]);
