
var app = angular.module("AppManager");


app.controller("editCtrlMovies", ["$scope","$http","$routeParams", "$location", function ($scope, $http,$routeParams,$location){
                    console.log("Movies editCtrl Inicializado!");
                    var API = "/api/v1/movies-stats/"+$routeParams.country+"/"+$routeParams.year;
                    
                    $http.get(API).then(function(response){
                        console.log("Datos recibidos: "+ JSON.stringify(response.data,null,2));
                        $scope.updatedMovie = response.data;
                    }, function (error){
                        $scope.status = error.status;
                        $scope.data = "";
                        });
                    
                    
                    
                    $scope.updateMovie = function(){
                        
                    if(confirm("¿Desea actualizar los datos?")){

                        $http.put(API,$scope.updatedMovie).then(function(response){
                        window.alert("OK actualizado");
                        $location.path("/api-movies/");
                        
                    }, function (error){
                        $scope.status = error.status;
                        $scope.data = "Los campos no estan rellenos correctamente";
                        });
                    }; 
                    
                    }
}]);