/* global angular */

var app = angular.module("AppManager");

app.controller("pruebaCtrl", ["$scope", "$http", function($scope, $http) {


    console.log("Controller initialized.");

    var API = "proxyPO/api/v1/youth-unemployment-stats";
    refresh();

    function refresh() {

        console.log("Requesting to <" + API + ">...");
        $http
            .get(API)
            .then(function(response) {

                console.log("Data received:" + JSON.stringify(response.data, null, 2));

                $scope.unemployments= response.data;
            });
    }

}]);