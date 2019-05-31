/* global angular */

var app = angular.module("AppManager");

app.controller("climateCtrl", ["$scope", "$http", function($scope, $http) {


    console.log("List Suicides Controller initialized.");

    var API = "https://sos1819-09.herokuapp.com/api/v2/climate-stats";
    refresh();

    function refresh() {

        console.log("Requesting to <" + API + ">...");
        $http
            .get(API)
            .then(function(response) {

                console.log("Data received:" + JSON.stringify(response.data, null, 2));

                $scope.climates= response.data;
            });
    }

}]);