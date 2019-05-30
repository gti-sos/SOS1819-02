/* global angular */

var app = angular.module("AppManager");

app.controller("gpeCtrl", ["$scope", "$http", function($scope, $http) {


    console.log("List general-public-expenses Controller initialized.");

    var API = "proxyGPE/api/v1/general-public-expenses/";
    refresh();

    function refresh() {

        console.log("Requesting movies to <" + API + ">...");
        $http
            .get(API)
            .then(function(response) {

                console.log("Data received:" + JSON.stringify(response.data, null, 2));

                $scope.gpes = response.data;
            });
    }

}]);