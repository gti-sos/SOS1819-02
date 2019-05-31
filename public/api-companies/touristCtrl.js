/* global angular */

var app = angular.module("AppManager");

app.controller("touristCtrl", ["$scope", "$http", function($scope, $http) {


    console.log("List tourist Controller initialized.");

    var aux = "https://sos1819-08.herokuapp.com/API/v1/tourists-by-countries";
    refresh();

    function refresh() {

        console.log("Requesting to <" + aux + ">...");
        $http
            .get(aux)
            .then(function(response) {
                console.log("Data received:" + JSON.stringify(response.data, null, 2));

                $scope.touristsByCountries = response.data;
            });
    }

}]);
