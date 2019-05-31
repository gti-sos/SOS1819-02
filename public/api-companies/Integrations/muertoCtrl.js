/* global angular */

var app = angular.module("AppManager");

app.controller("muertoCtrl", ["$scope", "$http", function($scope, $http) {


    console.log("List  Controller initialized.");

    var API = "https://sos1819-14.herokuapp.com/api/v1/deceaseds/";
    refresh();

    function refresh() {

        console.log("Requesting  to <" + API + ">...");
        $http
            .get(API)
            .then(function(response) {

                console.log("Data received:" + JSON.stringify(response.data, null, 2));

                $scope.deceaseds = response.data;
            });
    }

}]);