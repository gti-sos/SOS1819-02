/* global angular */

var app = angular.module("AppManager");

app.controller("pollutionCtrl", ["$scope", "$http", function($scope, $http) {


    console.log("List Pollution Stats Controller initialized.");

    var API = "/proxyP/api/v1/pollution-stats";
    refresh();

    function refresh() {

        console.log("Requesting movies to <" + API + ">...");
        $http
            .get(API)
            .then(function(response) {

                console.log("Data received:" + JSON.stringify(response.data, null, 2));

                $scope.pollutions = response.data;
            });
    }

}]);