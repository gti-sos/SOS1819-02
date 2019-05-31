/* global angular */

var app = angular.module("AppManager");

app.controller("suicidesCtrl2", ["$scope", "$http", function($scope, $http) {


    console.log("List Suicides Controller initialized.");

    var API = "proxyADRI/api/v1/suicide-rates";
    refresh();

    function refresh() {

        console.log("Requesting biofuels to <" + API + ">...");
        $http
            .get(API)
            .then(function(response) {

                console.log("Data received:" + JSON.stringify(response.data, null, 2));

                $scope.suicides = response.data;
            });
    }

}]);