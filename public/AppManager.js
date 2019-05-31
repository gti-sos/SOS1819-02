
        
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
             .when("analytics/api-movies/",{
              templateUrl:"./api-movies/moviesGraph.html",
              controller: "grafMoviesCtrl"
             })
             .when("/integrations/happiness-stats/", {
            templateUrl: "./api-movies/Integrations/happiness-stats.html",
            controller: "happinessCtrl"
            })
            .when("/integrations/biofuels/", {
            templateUrl: "./api-movies/Integrations/biofuels.html",
            controller: "biofuelsCtrl"
            })
            .when("/integrations/companies-stats/", {
            templateUrl: "./api-movies/Integrations/companies-stats.html",
            controller: "companiesCtrl"
            })
            .when("/integrations/gpe/", {
            templateUrl: "./api-movies/Integrations/gpe.html",
            controller: "gpeCtrl"
            })
            .when("/integrations/uefa/", {
            templateUrl: "./api-movies/Integrations/uefa.html",
            controller: "uefaCtrl"
            })
             .when("/api-scorers/",{
              templateUrl:"./api-scorers/list.html",
              controller: "ListCtrl"
             })
             .when("/api-scorers/:country/:year",{
              templateUrl:"./api-scorers/edit.html",
              controller: "editCtrl"
             })
             .when("/analytics/api-scorers",{
              templateUrl:"./api-scorers/scorersGraph.html",
              controller: "grafCtrl"
             })
             .when("/integrations/api1",{
              templateUrl:"./api-scorers/integracionAPI1.html",
              controller: "suicidesCtrl"
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
              .when("/integrations/beer",{
              templateUrl:"./api-companies/Beer.html",
              controller: "BeerCtrl"
             })
             .when("/integrations/taking",{
              templateUrl:"./api-companies/taking.html",
              controller: "takingCtrl"
             })
             .when("/analytics",{
              templateUrl:"./analytics.html",
             })
           .when("/integrations", {
            templateUrl: "./integrations.html",
           })
           .when("/about", {
            templateUrl: "./about.html",

           });
         });

