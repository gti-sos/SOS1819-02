/* global angular */

var app = angular.module("AppManager");

app.controller("biofuelsCtrl", ["$scope", "$http", function($scope, $http) {


    console.log("List Biofuels Controller initialized.");

    var API = "https://sos1819-10.herokuapp.com/api/v2/biofuels-production";
    refresh();

    function refresh() {

        console.log("Requesting movies to <" + API + ">...");
        $http
            .get(API)
            .then(function(response) {

                console.log("Data received:" + JSON.stringify(response.data, null, 2));

                $scope.biofuels = response.data;
            });
    }

}]);