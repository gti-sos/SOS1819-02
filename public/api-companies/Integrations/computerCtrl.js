/* global angular */

var app = angular.module("AppManager");

app.controller("computerCtrl", ["$scope", "$http", function($scope, $http) {


    console.log("List  Controller initialized.");

    var API = "https://sos1819-03.herokuapp.com/api/v1/computers-attacks-stats";
    refresh();

    function refresh() {

        console.log("Requesting  to <" + API + ">...");
        $http
            .get(API)
            .then(function(response) {

                console.log("Data received:" + JSON.stringify(response.data, null, 2));

                $scope.attacks = response.data;
            });
    }

}]);