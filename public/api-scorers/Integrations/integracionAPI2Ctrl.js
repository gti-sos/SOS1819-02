/* global angular */

var app = angular.module("AppManager");

app.controller("compaCtrl", ["$scope", "$http", function($scope, $http) {


    console.log("Controller initialized.");

    var API = "https://sos1819-03.herokuapp.com/api/v1/companies";
    var API2 = "/api/v1/scorers-stats";
    refresh();

    function refresh() {

        console.log("Requesting to <" + API + ">...");
        $http
            .get(API)
            .then(function(response) {
        console.log("Requesting to <" + API + ">...");
        $http
            .get(API2)
            .then(function(response1) {
                console.log("Data received:" + JSON.stringify(response1.data, null, 2));
                console.log("Data received:" + JSON.stringify(response.data, null, 2));
                var countries1 = [];
                var countries2 = [];
                var year1 = [];
                var year2 = [];
                var numCompañias = [];
                var goles = [];
                var numCompañias = [];
                var res = [];
                var res2 = [];
                countries1 = response.data.map(function(d) { return d.country });
                countries2 = response1.data.map(function(d) { return d.country });
                year1 = response.data.map(function(d) { return d.year });
                year2 = response1.data.map(function(d) { return d.year });
                goles = response1.data.map(function(d) { return d.scorergoal });
                numCompañias = response.data.map(function(d) { return d.numberOfCompanies });
                 for (var i=0; i< goles.length;i++){
                res.push({
      label: countries1[i]+" "+ year1[i],
      value: numCompañias[i]
    },{
      label: countries2[i]+" "+ year2[i],
      value: goles[i]
    });
                 }   
                 console.log(res,res2);
            const dataSource = {
  chart: {
    caption: "FusionCharts : Donut 3D",
    enablesmartlabels: "1",
    showlabels: "1",
    numbersuffix: " MMbbl",
    usedataplotcolorforlabels: "1",
    plottooltext: "$label, <b>$value</b>",
    theme: "fusion"
  },
  data: 
   res
  
};

FusionCharts.ready(function() {
  var myChart = new FusionCharts({
    type: "doughnut3d",
    renderAt: "chart-container",
    width: "100%",
    height: "100%",
    dataFormat: "json",
    dataSource
  }).render();
});
               
            });

               
            });
    }

}]);