/* global angular */

var app = angular.module("AppManager");

app.controller("compaCtrl", ["$scope", "$http", function($scope, $http) {


    console.log("Controller initialized.");

    var API = "https://sos1819-03.herokuapp.com/api/v1/companies";
    refresh();

    function refresh() {

        console.log("Requesting to <" + API + ">...");
        $http
            .get(API)
            .then(function(response) {

                console.log("Data received:" + JSON.stringify(response.data, null, 2));

                $scope.companies = response.data;
            });
    }

}]);