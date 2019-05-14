        
        /*global angular*/
        
        angular.module("AppManager",["ngRoute"])
            .config(function($routeProvider){
             $routeProvider
             .when("/",{
              templateUrl:"/principal.html",
           
             })
             .when("/api-movies/",{
              templateUrl:"./api-movies/list.html",
              controller: "ListCtrl"
             })
             .when("/api-movies/:country/:year",{
              templateUrl:"./api-movies/edit.html",
              controller: "editCtrl"
             })
             .when("/api-companies/",{
              templateUrl:"./api-companies/list.html",
              controller: "ListCtrl"
             })
             .when("/api-companies/:country/:year",{
              templateUrl:"./api-companies/edit.html",
              controller: "editCtrl"
              
             });
            });