/* global angular */

var app = angular.module("AppManager");

app.controller("uefaCtrl", ["$scope", "$http", function($scope, $http) {


    console.log("List Uefa club rankings Controller initialized.");

    var API = "/proxyUEFA/api/v1/uefa-club-rankings/";
    refresh();

    function refresh() {

        console.log("Requesting movies to <" + API + ">...");
        $http
            .get(API)
            .then(function(response) {

                console.log("Data received:" + JSON.stringify(response.data, null, 2));

                $scope.uefas = response.data;
            });
    }

}]);