
/* global angular $scope*/

var app = angular.module("CompaniesApp");


app.controller("editCtrl", ["$scope","$http","$routeParams", "$location", function ($scope, $http,$routeParams,$location){
                    console.log("Companies editCtrl Initialized!");
                    var API = "/api-companies/v1/companies-stats/"+$routeParams.country+"/"+$routeParams.year;
                    
                    $http.get(API).then(function(response){
                        console.log("Datos recibidos: "+ JSON.stringify(response.data,null,2));
                        $scope.updatedCompany = response.data;
                    }, function (error){
                        $scope.status = error.status;
                        $scope.data = "";
                        });
                    
                    
                    
                    $scope.updateCompany = function(){
                         $http.put(API,$scope.updatedCompany).then(function(response){
                         $location.path("/");
                    }, function (error){
                        $scope.status = error.status;
                        $scope.data = "";
                        });
                    }; 
}]);