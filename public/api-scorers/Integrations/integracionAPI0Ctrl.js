/* global angular */

var app = angular.module("AppManager");

app.controller("aCtrl", ["$scope", "$http", function($scope, $http) {


    console.log("Controller initialized.");

    var API = "proxySR/api/v1/suicide-rates";
    refresh();

    function refresh() {

        console.log("Requesting to <" + API + ">...");
        $http
            .get(API)
            .then(function(response) {

                console.log("Data received:" + JSON.stringify(response.data, null, 2));





                
                
            });
    
    }
    

}]);