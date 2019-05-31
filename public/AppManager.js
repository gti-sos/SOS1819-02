/*global angular*/
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
   .when("analytics/api-movies/", {
    templateUrl: "./api-movies/moviesGraph.html",
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
   .when("/integrations/economy/", {
    templateUrl: "./api-movies/Integrations/economy.html",
    controller: "economyCtrl"
   })
   .when("/integrations/pollution/", {
    templateUrl: "./api-movies/Integrations/pollution.html",
    controller: "pollutionCtrl"
   })
   .when("/integrations/country/", {
    templateUrl: "./api-movies/Integrations/country.html",
    controller: "countryCtrl"
   })
   .when("/api-scorers/", {
    templateUrl: "./api-scorers/list.html",
    controller: "ListCtrl"
   })
   .when("/api-scorers/:country/:year", {
    templateUrl: "./api-scorers/edit.html",
    controller: "editCtrl"
   })
   .when("/analytics/api-scorers", {
    templateUrl: "./api-scorers/scorersGraph.html",
    controller: "grafCtrl"
   })
   .when("/integrations/api1", {
    templateUrl: "./api-scorers/Integrations/integracionAPI1.html",
    controller: "suicidesCtrl"
   })
   .when("/integrations/api2", {
    templateUrl: "./api-scorers/Integrations/integracionAPI2.html",
    controller: "compaCtrl"
   })
   .when("/integrations/api3", {
    templateUrl: "./api-scorers/Integrations/integracionAPI3.html",
    controller: "excountryCtrl"
   })
   .when("/integrations/api4", {
    templateUrl: "./api-scorers/Integrations/integracionAPI4.html",
    controller: "peliculasCtrl"
   })
   .when("/integrations/api5", {
    templateUrl: "./api-scorers/Integrations/integracionAPI5.html",
    controller: "uefaCtrl"
   })
   .when("/integrations/api6", {
    templateUrl: "./api-scorers/Integrations/integracionAPI6.html",
    controller: "unemploymentCtrl"
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
    templateUrl: "./api-companies/Analitica/companiesGraph.html",
    controller: "grafComCtrl"
   })
   .when("/integrations/beer", {
    templateUrl: "./api-companies/Integrations/Beer.html",
    controller: "BeerCtrl"
   })
   .when("/integrations/taking", {
    templateUrl: "./api-companies/Integrations/taking.html",
    controller: "takingCtrl"
   })
   .when("/integrations/uefa", {
    templateUrl: "./api-companies/Integrations/uefa.html",
    controller: "uefaCtrl"
   })
   .when("/integrations/tourist", {
    templateUrl: "./api-companies/Integrations/tourist.html",
    controller: "touristCtrl"
   })
   .when("/integrations/scorer", {
    templateUrl: "./api-companies/Integrations/scorer.html",
    controller: "scorerCtrl"
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
