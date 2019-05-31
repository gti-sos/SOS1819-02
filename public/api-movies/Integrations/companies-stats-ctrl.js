/* global angular */

var app = angular.module("AppManager");

app.controller("companiesCtrl", ["$scope", "$http", function($scope, $http) {


    console.log("List Companies Controller initialized.");

    var API = "https://sos1819-02.herokuapp.com/api/v1/companies-stats/";
    refresh();

    function refresh() {

        console.log("Requesting movies to <" + API + ">...");
        $http
            .get(API)
            .then(function(response) {

                console.log("Data received:" + JSON.stringify(response.data, null, 2));

                $scope.companies = response.data;
            });
    }

}]);