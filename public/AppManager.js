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
   .when("/analytics/api-movies", {
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
   .when("/integrations/formula1/", {
    templateUrl: "./api-movies/Integrations/formula1.html",
    controller: "formula1Ctrl"
   })
   .when("/integrations/tiempo/", {
    templateUrl: "./api-movies/Integrations/tiempo.html",
    controller: "tiempoCtrl"
   })
   .when("/integrations/elements/", {
    templateUrl: "./api-movies/Integrations/elements.html",
    controller: "elementsCtrl"
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
   .when("/integrations/api0", {
    templateUrl: "./api-scorers/Integrations/integracionAPI0.html",
    controller: "aCtrl"
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
    controller: "pruebaCtrl"
   })
   .when("/integrations/api7", {
    templateUrl: "./api-scorers/Integrations/integracionAPI7.html",
    controller: "climateCtrl"
   })
   .when("/integrations/api8", {
    templateUrl: "./api-scorers/Integrations/integracionAPI8.html",
    controller: "carCtrl"
   })
   .when("/integrations/api9", {
    templateUrl: "./api-scorers/Integrations/integracionAPI9.html",
    controller: "donaldCtrl"
   })
   .when("/integrations/api10", {
    templateUrl: "./api-scorers/Integrations/integracionAPI10.html",
    controller: "extCtrl"
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
    controller: "uefaJaCtrl"
   })
   .when("/integrations/tourist", {
    templateUrl: "./api-companies/Integrations/tourist.html",
    controller: "touristCtrl"
   })
   .when("/integrations/scorer", {
    templateUrl: "./api-companies/Integrations/scorer.html",
    controller: "scorerCtrl"
   })
   .when("/integrations/education", {
    templateUrl: "./api-companies/Integrations/education.html",
    controller: "educationCtrl"
   })
   .when("/integrations/muerto", {
    templateUrl: "./api-companies/Integrations/muerto.html",
    controller: "muertoCtrl"
   })
   .when("/integrations/computer", {
    templateUrl: "./api-companies/Integrations/computer.html",
    controller: "computerCtrl"
   })
    .when("/integrations/ext1", {
    templateUrl: "./api-companies/Integrations/ext1.html",
    controller: "ext1Ctrl"
   })
   .when("/integrations/ext2", {
    templateUrl: "./api-companies/Integrations/ext2.html",
    controller: "ext2Ctrl"
   })
   .when("/analytics", {
    templateUrl: "./analytics.html",
    controller: "integrationsCtrl"
   })
   .when("/integrations", {
    templateUrl: "./integrations.html",
    
   })
   .when("/integrations/integrationPablo", {
    templateUrl: "./integrationPablo.html",
   })
   .when("/integrations/integrationAle", {
    templateUrl: "./integrationAle.html",
   })
   .when("/integrations/integrationAlberto", {
    templateUrl: "./integrationAlberto.html",
   })
   .when("/about", {
    templateUrl: "./about.html",
   });
 });
