/* global angular $scope*/

var app = angular.module("MoviesApp");


app.controller("ListCtrl", ["$scope","$http", function ($scope, $http){
                    console.log("Movies MainCtrl Inicializado!");
                    var API = "/api/v1/movies-stats/";
                    var search = "?";
                    var limit = 10;
                    var offset = 0;
                    var paginationString = "";
                    $scope.currentPage = 1;
                    $scope.data1="¡Bienvenidos!";
                    $scope.data2="Esto es Movies APP y sus datos se encuentran actualizados";
                    refresh();
                    
                    function refresh(){
                    paginationString = "&limit=" + limit + "&offset=" + offset;
                    $http.get(API+ search + paginationString).then(function(response){
                        console.log("Datos recibidos: "+ JSON.stringify(response.data,null,2));
                        $scope.movies = response.data;
                         if($scope.movies.length==0){

                        $scope.data2="No existe una película con esas características";
                    }else{

                    }
                        
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
                    console.log(API+ search + paginationString);

                    refresh();
                    search="?";
                    window.alert("¡Búsqueda realizada! ");
                    };

                     $scope.nextPage = function() {
                     if ($scope.movies.length == limit) {
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
    
                          $scope.data1="¡Genial!";
                          $scope.data2="Creado con éxito";     
                             
                        console.log("Response : "+ response.status + response.data);
                        refresh();
                    }, function (error){
                        $scope.data1="¡Ohh!";
                        $scope.data2="Rellene los campos correctamente";
                        $scope.status = error.status;
                        });
                    };
                    
                    $scope.deleteMovie = function(country,year){
                       console.log("Borrando movie cuyo country es: " +country);
                       console.log("Borrando movie cuyo year es: " +year);
                       console.log(API+country+"/"+year);
                       if(confirm("¿Desea borrar los datos de la película?")){
                         $http.delete(API+country+"/"+year).then(function(response){
                            $scope.data1="¡Genial!";
                            $scope.data2="Borrada la película cuyo año es "+ year + " y su país es " + country;
                        console.log("Response : "+ response.status + response.data);
                        refresh();
                    }, function (error){
                        $scope.status = error.status;
                        $scope.data1="¡Ohh!";
                        $scope.data2="No se puede borrar";
                        });
                       
                    };
                    }
                    
                     $scope.deleteMovieAll = function(){
                        if(confirm("¿Desea borrarlo todos los datos?")){
                         $http.delete(API).then(function(response){
                          $scope.data1="¡Genial!";
                          $scope.data2="Borraste todo con éxito";     
                        console.log("Response : "+ response.status + response.data);
                        refresh();
                    }, function (error){
                        $scope.status = error.status;
                        $scope.data1="¡Ohh!";
                        $scope.data2="No se puede borrar";
                        });
                    };
                    }
                    
                    $scope.restaurar = function (){
                        if(confirm("¿Desea restaurar los datos?")){
                        $http.get(API + "loadInitialData").then(function (response){
                          $scope.data1="¡Genial!";
                          $scope.data2="Restauraste los datos con éxito";
                        console.log("Response : "+ response.status + response.data);
                        refresh();
                        }).catch(function (response) {
                            
                            $scope.data1="¡Aviso!";
                            $scope.data2="Para restaurar los datos debe previamente borrar todos los registros";
                            $scope.status = response.status;
			            	$scope.statusInfo = JSON.stringify(response.status, null, 2);
			            });
                    };
                    }
}]);
