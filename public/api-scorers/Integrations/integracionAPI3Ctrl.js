/* global angular */

var app = angular.module("AppManager");

app.controller("excountryCtrl", ["$scope", "$http", function($scope, $http) {


    console.log("Controller initialized.");

    var API = "https://sos1819-08.herokuapp.com/api/v1/expenses-of-countries-in-education-and-culture";
    refresh();

    function refresh() {

        console.log("Requesting to <" + API + ">...");
        $http
            .get(API)
            .then(function(response) {

                console.log("Data received:" + JSON.stringify(response.data, null, 2));

                $scope.expcountries = response.data;
            });
    }

}]);