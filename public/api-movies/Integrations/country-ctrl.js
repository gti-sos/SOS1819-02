/* global angular */

var app = angular.module("AppManager");

app.controller("countryCtrl", ["$scope", "$http", function($scope, $http) {


    console.log("List Country Stats Controller initialized.");

    var API = "https://sos1819-03.herokuapp.com/api/v1/country-stats/";
    refresh();

    function refresh() {

        console.log("Requesting movies to <" + API + ">...");
        $http
            .get(API)
            .then(function(response) {

                console.log("Data received:" + JSON.stringify(response.data, null, 2));

                $scope.countries = response.data;
            });
    }

}]);