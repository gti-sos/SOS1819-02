        /*global angular*/
<<<<<<< HEAD
        
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
             .when("/analytics/api-movies/",{
              templateUrl:"./api-movies/moviesGraph.html",
              controller: "grafMoviesCtrl"
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
              controller: "grafCtrl"
             })
             .when("/api-companies/",{
              templateUrl:"./api-companies/list.html",
              controller: "ListCtrlcompanies"
             })
             .when("/api-companies/:country/:year",{
              templateUrl:"./api-companies/edit.html",
              controller: "editCtrlcompanies"
             })
             .when("/analytics/api-companies",{
              templateUrl:"./api-companies/companiesGraph.html",
              controller: "grafComCtrl"
             })
             .when("/analytics",{
              templateUrl:"./analytics.html",
             
             });
            });
=======

        angular.module("AppManager", ["ngRoute"])
         .config(function($routeProvider) {
          $routeProvider
           .when("/", {
            templateUrl: "/principal.html",

           })
           .when("/api-movies/", {
            templateUrl: "./api-movies/list.html",
            controller: "ListCtrlMovies"
           })
           .when("/api-movies/:country/:year", {
            templateUrl: "./api-movies/edit.html",
            controller: "editCtrlMovies"
           })
           .when("/api-movies/highcharts", {
            templateUrl: "./api-movies/moviesGraph.html",
            controller: "grafMoviesCtrl"
           })
           .when("/api-scorers/", {
            templateUrl: "./api-scorers/list.html",
            controller: "ListCtrl"
           })
           .when("/api-scorers/:country/:year", {
            templateUrl: "./api-scorers/edit.html",
            controller: "editCtrl"
           })
           .when("/api-scorers/prueba", {
            templateUrl: "./api-scorers/scorersGraph.html",
            controller: "grafCtrl"
           })
           .when("/api-companies/", {
            templateUrl: "./api-companies/list.html",
            controller: "ListCtrlcompanies"
           })
           .when("/api-companies/:country/:year", {
            templateUrl: "./api-companies/edit.html",
            controller: "editCtrlcompanies"
           })
           .when("/analytics/api-companies", {
            templateUrl: "./api-companies/companiesGraph.html",
            controller: "grafComCtrl"
           })
           .when("/analytics", {
            templateUrl: "./analytics.html",
           })
           .when("/integrations", {
            templateUrl: "./integrations.html",
           })
           .when("/about", {
            templateUrl: "./about.html",

           });
         });
        
>>>>>>> 5df94f707dfb00d17b61e620bbd9629af6c65fb0
