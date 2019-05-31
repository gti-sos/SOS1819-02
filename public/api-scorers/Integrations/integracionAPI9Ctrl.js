/* global angular */

var app = angular.module("AppManager");

app.controller("donaldCtrl", ["$scope", "$http", function($scope, $http) {


    console.log("Controller initialized.");

    var API = "https://rapidapi.com/matchilling/api/tronald-dump";
    refresh();

    function refresh() {

        console.log("Requesting to <" + API + ">...");
        $http
            .get(API)
            .then(function(response) {

                console.log("Data received:" + JSON.stringify(response.data, null, 2));

                $scope.donald= response.data;
                console.log("aaaa");
            });
    }

}]);