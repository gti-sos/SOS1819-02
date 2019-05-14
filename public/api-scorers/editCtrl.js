
var app = angular.module("AppManager");


app.controller("editCtrl", ["$scope","$http","$routeParams", "$location", function ($scope, $http,$routeParams,$location){
                    console.log("Scorers editCtrl Initialized!");
                    var API = "/!#/api-scorers"+$routeParams.country+"/"+$routeParams.year;
                    
                    $http.get(API).then(function(response){
                        console.log("Datos recibidos: "+ JSON.stringify(response.data,null,2));
                        $scope.updatedScorer = response.data;
                    }, function (error){
                        $scope.status = error.status;
                        $scope.data = "";
                        });
                    
                    
                    
                    $scope.updateScorer = function(){
                        if(confirm("¿Desea actualizar los datos?")){
                         $http.put(API,$scope.updatedScorer).then(function(response){
                             window.alert("OK actualizado");
                         $location.path("/");
                         
                         
                    }, function (error){
                        $scope.status = error.status;
                        $scope.data = "Los campos no estan rellenos correctamente";
                        });
                    }; 
                    }
}]);