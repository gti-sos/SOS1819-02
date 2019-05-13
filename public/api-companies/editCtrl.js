/* global angular $scope*/

var app = angular.module("AppManager");


app.controller("editCtrl", ["$scope", "$http", "$routeParams", "$location", function($scope, $http, $routeParams, $location) {
    console.log("Companies editCtrl Initialized!");
    var API = "/api/v1/companies-stats/" + $routeParams.country + "/" + $routeParams.year;

    $http.get(API).then(function(response) {
        console.log("Datos recibidos: " + JSON.stringify(response.data, null, 2));
        $scope.updatedCompany = response.data;
    }, function(error) {
        $scope.status = error.status;
        $scope.data = "";
    });



    $scope.updateCompany = function() {
        if (confirm("¿Desea actualizar los datos?")) {
            $http.put(API, $scope.updatedCompany).then(function(response) {
                window.alert("OK actualizado");
                $location.path("/api-companies");
            }, function(error) {
                $scope.status = error.status;
                $scope.data = "Los campos no estan rellenos correctamente";
            });
        };
    }
}]);
