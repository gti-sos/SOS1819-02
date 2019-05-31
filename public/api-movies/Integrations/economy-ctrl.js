/* global angular */

var app = angular.module("AppManager");

app.controller("economyCtrl", ["$scope", "$http", function($scope, $http) {


    console.log("List Economy Stats Controller initialized.");

    var API = "/proxyE/api/v1/economy-stats";
    refresh();

    function refresh() {

        console.log("Requesting movies to <" + API + ">...");
        $http
            .get(API)
            .then(function(response) {

                console.log("Data received:" + JSON.stringify(response.data, null, 2));

                $scope.economies = response.data;
            });
    }

}]);