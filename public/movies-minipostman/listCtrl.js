/* global angular $scope*/

var app = angular.module("MoviesApp");


app.controller("ListCtrl", ["$scope","$http", function ($scope, $http){
                    console.log("Movies MainCtrl Inicializado!");
                    var API = "/api-movies/v1/movies-stats/";
                    var search = "?";
                    var limit = 5;
                    var offset = 0;
                    var paginationString = "";
                    $scope.currentPage = 1;
                    refresh();
                    
                    function refresh(){
                    paginationString = "&limit=" + limit + "&offset=" + offset;
                    $http.get(API+ search + paginationString).then(function(response){
                        console.log("Datos recibidos: "+ JSON.stringify(response.data,null,2));
                        $scope.movies = response.data;
                        $scope.previousPage = function() {
                     if ($scope.currentPage > 1) {
                     offset -= limit;
                     refresh();
                     $scope.currentPage -= 1;
                    }
                 };
                 $scope.searchMovie1 = function() {
                    search = "?";
                    paginationString = "";
                    
                    refresh();
                 }
                 $scope.searchMovie = function() {
                    if ($scope.searchForm.name) {
                    search += ("&name=" + $scope.searchForm.name);
                    }
                    if ($scope.searchForm.country) {
                    search += ("&country=" + $scope.searchForm.country);
                    }
                    if ($scope.searchForm.year) {
                    search += ("&year=" + $scope.searchForm.year);
                    }
                    if ($scope.searchForm.movienomination) {
                    search += ("&movienomination=" + $scope.searchForm.movienomination);
                    }
                    if ($scope.searchForm.movieaward) {
                        console.log($scope.searchForm.scorermatch);
                    search += ("&movieaward=" + $scope.searchForm.movieaward);
                    }
                    if ($scope.searchForm.movieedition) {
                    search += ("&movieedition=" + $scope.searchForm.movieedition);
                    }
                    if ($scope.searchForm.from) {
                    search += ("&from=" + $scope.searchForm.from);
                    }
                    if ($scope.searchForm.to) {
                    search += ("&to=" + $scope.searchForm.to);
                    }
                    console.log(search);
                    refresh();
                    search="?";
                    };

                     $scope.nextPage = function() {
                     if ($scope.scorers.length == limit) {
                    offset += limit;
                    refresh();
                    $scope.currentPage += 1;
                    }
                    };
                    }, function (error){
                        $scope.status = error.status;
                        $scope.data = "";
                        });
                    
                    }
                    
                    
                    
                    $scope.addMovie = function(){
                        var newMovie = $scope.newMovie;
                       console.log("nueva pelicula: "+JSON.stringify(newMovie,null,2));
                         $http.post(API,newMovie).then(function(response){
                        console.log("Response : "+ response.status + response.data);
                        refresh();
                    }, function (error){
                        $scope.status = error.status;
                        $scope.data = "";
                        });
                    };
                    
                    $scope.deleteMovie = function(country,year){
                       console.log("Borrando movie cuyo country es: " +country);
                       console.log("Borrando movie cuyo year es: " +year);
                       console.log(API+country+"/"+year);
                         $http.delete(API+country+"/"+year).then(function(response){
                        console.log("Response : "+ response.status + response.data);
                        refresh();
                    }, function (error){
                        $scope.status = error.status;
                        $scope.data = "";
                        });
                    };
                    
                     $scope.deleteMovieAll = function(){
                         $http.delete(API).then(function(response){
                        console.log("Response : "+ response.status + response.data);
                        refresh();
                    }, function (error){
                        $scope.status = error.status;
                        $scope.data = "";
                        });
                    };
                    
                    $scope.restaurar = function (){
                        $http.get(API + "loadInitialData").then(function (response){
                        console.log("Response : "+ response.status + response.data);
                        refresh();
                        }).catch(function (response) {
                            $scope.status = response.status;
			            	$scope.statusInfo = JSON.stringify(response.status, null, 2);
			            });
                    };

}]);