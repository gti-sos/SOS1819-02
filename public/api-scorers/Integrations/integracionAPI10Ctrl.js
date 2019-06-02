/* global angular */

var app = angular.module("AppManager");

app.controller("extCtrl", ["$scope", "$http", function($scope, $http) {


    console.log("Controller initialized.");

   var API = "https://restcountries.eu/rest/v2/regionalbloc/eu";
    refresh();

    function refresh() {

        console.log("Requesting to <" + API + ">...");
        $http
            .get(API)
            .then(function(response) {

                console.log("Data received:" + JSON.stringify(response.data, null, 2));

                $scope.exts= response.data;
            });
    }

}]);