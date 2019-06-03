/* global angular */

var app = angular.module("AppManager");

app.controller("aCtrl", ["$scope", "$http", function($scope, $http) {


    console.log("Controller initialized.");

    var API = "proxySR/api/v1/suicide-rates";
    refresh();

    function refresh() {

        console.log("Requesting to <" + API + ">...");
        $http
            .get(API)
            .then(function(response) {

                console.log("Data received:" + JSON.stringify(response.data, null, 2));


              const dataSource = {
  chart: {
    caption: "Top 5 countries with Global Oil Reserves",
    subcaption: "MMbbl= One Million barrels",
    enablesmartlabels: "1",
    showlabels: "1",
    numbersuffix: " MMbbl",
    usedataplotcolorforlabels: "1",
    plottooltext: "$label, <b>$value</b> MMbbl",
    theme: "fusion"
  },
  data: [
    {
      label: "Venezuela",
      value: "290"
    },
    {
      label: "Saudi",
      value: "260"
    },
    {
      label: "Canada",
      value: "180"
    },
    {
      label: "Iran",
      value: "140"
    },
    {
      label: "Russia",
      value: "115"
    }
  ]
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
    
    }
    

}]);