/* global angular */

var app = angular.module("AppManager");

app.controller("educationCtrl", ["$scope", "$http", function($scope, $http) {


    console.log("List  Controller initialized.");

    var API = "https://sos1819-11.herokuapp.com/api/v2/public-expenditure-educations";
    refresh();

    function refresh() {

        console.log("Requesting  to <" + API + ">...");
        $http
            .get(API)
            .then(function(response) {

                console.log("Data received:" + JSON.stringify(response.data, null, 2));

                $scope.generalPublicExpenses = response.data;
            });
    }

}]);