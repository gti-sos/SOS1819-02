/* global angular */

var app = angular.module("AppManager");

app.controller("carCtrl", ["$scope", "$http", function($scope, $http) {


    console.log("Controller initialized.");

    var API = "https://sos1819-10.herokuapp.com/api/v1/e-car-statics";
    refresh();

    function refresh() {

        console.log("Requesting to <" + API + ">...");
        $http
            .get(API)
            .then(function(response) {

                console.log("Data received:" + JSON.stringify(response.data, null, 2));

                $scope.cars= response.data;
                console.log("aaaa");
            });
    }

}]);