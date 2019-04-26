
               
        /*global angular*/
        
        angular.module("CompaniesApp",["ngRoute"])
            .config(function($routeProvider){
             $routeProvider
             .when("/",{
              templateUrl:"companies.html",
              controller: "MainCtrl"
             })
             
             
            })