/* global angular $scope*/

var app = angular.module("ScorersApp");


app.controller("ListCtrl", ["$scope","$http", function ($scope, $http){
                    console.log("Scorers MainCtrl Initialized!");
                    var API = "/api-scorers/v1/scorers-stats/";
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
                        $scope.scorers = response.data;
                        $scope.previousPage = function() {
                     if ($scope.currentPage > 1) {
                     offset -= limit;
                     refresh();
                     $scope.currentPage -= 1;
                    }
                 };
                 $scope.searchScorer1 = function() {
                    search = "?";
                    paginationString = "";
                    
                    refresh();
                 }
                 $scope.searchScorer2 = function() {
                    if ($scope.searchForm.name) {
                    search += ("&name=" + $scope.searchForm.name);
                    }
                    if ($scope.searchForm.country) {
                    search += ("&country=" + $scope.searchForm.country);
                    }
                    if ($scope.searchForm.year) {
                    search += ("&year=" + $scope.searchForm.year);
                    }
                    if ($scope.searchForm.scorergoal) {
                    search += ("&scorergoal=" + $scope.searchForm.scorergoal);
                    }
                    if ($scope.searchForm.scorermatch) {
                        console.log($scope.searchForm.scorermatch);
                    search += ("&scorermatch=" + $scope.searchForm.scorermatch);
                    }
                    if ($scope.searchForm.scoreraverage) {
                    search += ("&scoreraverage=" + $scope.searchForm.scoreraverage);
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
                    
                    
                    
                    $scope.addScorer = function(){
                        var newScorer = $scope.newScorer;
                       console.log("nuevo contacto: "+JSON.stringify(newScorer,null,2));
                         $http.post(API,newScorer).then(function(response){
                        console.log("Response : "+ response.status + response.data);
                        refresh();
                    }, function (error){
                        $scope.status = error.status;
                        $scope.data = "";
                        });
                    };
                    
                    $scope.deleteScorer = function(country,year){
                       console.log("Borrando scorer cuyo country es: " +country);
                       console.log("Borrando scorer cuyo year es: " +year);
                       console.log(API+country+"/"+year);
                         $http.delete(API+country+"/"+year).then(function(response){
                        console.log("Response : "+ response.status + response.data);
                        refresh();
                    }, function (error){
                        $scope.status = error.status;
                        $scope.data = "";
                        });
                    };
                    
                     $scope.deleteScorerAll = function(){
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
                    
                    
               /*     
                    $scope.put = function(){
                    $http.put($scope.url,$scope.data).then(function(response){
                        $scope.status = response.status;
                        $scope.data = "";
                    }, function (error){
                        $scope.status = error.status;
                        $scope.data = "";
                        });
                    };
                
                    $scope.delete = function(){
                    $http.delete($scope.url).then(function(response){
                        $scope.status = response.status;
                        $scope.data = "";
                    }, function (error){
                        $scope.status = error.status;
                        $scope.data = "";
                        });
                    };
                    
                    $scope.loadInitialData = function (){
                        $http.get($scope.url + "loadInitialData").then(function (response){
                            $scope.status = response.status;
                            $scope.data = JSON.stringify(response.data,null,2);
                            $scope.statusInfo = JSON.stringify(response.status, null, 2);
                        }).catch(function (response) {
                            $scope.status = response.status;
			            	$scope.statusInfo = JSON.stringify(response.status, null, 2);
			            });
                    };
                    */
}]);