/* global angular */

var app = angular.module("AppManager");

app.controller("uefaJaCtrl", ["$scope", "$http", function($scope, $http) {


    console.log("List Uefa club rankings Controller initialized.");

    var API = "https://sos1819-06.herokuapp.com/api/v1/uefa-club-rankings/";
    refresh();

    function refresh() {

        console.log("Requesting  to <" + API + ">...");
        $http
            .get(API)
            .then(function(response) {

                console.log("Data received:" + JSON.stringify(response.data, null, 2));

                $scope.uefaclubrankings = response.data;
            });
    }

}]);