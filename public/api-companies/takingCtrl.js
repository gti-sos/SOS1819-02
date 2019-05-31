/* global angular */

var app = angular.module("AppManager");

app.controller("takingCtrl", ["$scope", "$http", function($scope, $http) {


    console.log("List Beer Controller initialized.");

    var aux = "proxyDio/api/v1/takingStats";
    refresh();

    function refresh() {

        console.log("Requesting to <" + aux + ">...");
        $http
            .get(aux)
            .then(function(response) {
                console.log("Data received:" + JSON.stringify(response.data, null, 2));

                $scope.takingstats = response.data;
                console.log("$scope.takingstats");
            });
    }

}]);
