        
        /*global angular*/
        
        angular.module("AppManager",["ngRoute"])
            .config(function($routeProvider){
             $routeProvider
             .when("/",{
              templateUrl:"/principal.html",
           
             })
             .when("/api-movies/",{
              templateUrl:"./api-movies/list.html",
              controller: "ListCtrlMovies"
             })
             .when("/api-movies/:country/:year",{
              templateUrl:"./api-movies/edit.html",
              controller: "editCtrlMovies"
             })
             .when("/api-scorers/",{
              templateUrl:"./api-scorers/list.html",
              controller: "ListCtrl"
             })
             .when("/api-scorers/:country/:year",{
              templateUrl:"./api-scorers/edit.html",
              controller: "editCtrl"
             })
             .when("/api-scorers/prueba",{
              templateUrl:"./api-scorers/scorersGraph.html",
              controller: ""
             })
             .when("/api-companies/",{
              templateUrl:"./api-companies/list.html",
              controller: "ListCtrlcompanies"
             })
             .when("/api-companies/:country/:year",{
              templateUrl:"./api-companies/edit.html",
              controller: "editCtrlcompanies"
              
             });
            });