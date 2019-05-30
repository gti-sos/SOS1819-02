/* global angular */

var app = angular.module("AppManager");

app.controller("happinessCtrl", ["$scope", "$http", function($scope, $http) {


    console.log("List Happyness-Stats Controller initialized.");

    var API = "proxyHS/api/v1/happiness-stats";
    refresh();

    function refresh() {

        console.log("Requesting movies to <" + API + ">...");
        $http
            .get(API)
            .then(function(response) {

                console.log("Data received:" + JSON.stringify(response.data, null, 2));

                $scope.happy = response.data;
            });
    }

}]);