/* global angular $scope*/

var app = angular.module("ScorersApp");


app.controller("MainCtrl", ["$scope","$http", function ($scope, $http){
                    console.log("Scorers MainCtrl Initialized!");
                    var API = "/api-scorers/v1/scorers-stats/";
                    refresh();
                    
                    function refresh(){
                    
                    $http.get(API).then(function(response){
                        console.log("Datos recibidos: "+ JSON.stringify(response.data,null,2));
                        $scope.scorers = response.data;
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