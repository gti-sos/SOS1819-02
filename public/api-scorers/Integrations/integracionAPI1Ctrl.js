/* global angular */

var app = angular.module("AppManager");

app.controller("suicidesCtrl", ["$scope", "$http", function($scope, $http) {


    console.log("Controller initialized.");

    var API = "proxySR/api/v1/suicide-rates";
    var API2 = "/api/v1/scorers-stats";
    refresh();

    function refresh() {

        console.log("Requesting to <" + API + ">...");
        $http
            .get(API)
            .then(function(response) {
         $http
            .get(API2)
            .then(function(response1) {
        
                var countries1 = [];
                var goles = [];
                var suicides = [];
                var promedio = [];
                var res= [];
                console.log("Data received:" + JSON.stringify(response.data, null, 2));

                $scope.suicides = response.data;
                countries1 = response.data.map(function(d) { return d.country });
                suicides = response.data.map(function(d) { return d.noSuicidesMan });
                goles = response1.data.map(function(d) { return d.scorergoal });
                promedio = response1.data.map(function(d) { return d.scoreraverage });
                console.log("nombres-->"+countries1[0]);
                console.log("Data received:" + JSON.stringify(response1.data, null, 2));
                console.log("suucidiossssssssssssssss"+suicides)
                for (var i=0; i< goles.length;i++){
     res.push({
          "x": goles[i],
          "y": suicides[i],
          "z": promedio[i],
          "name": countries1[i]
        });
   }
  //var datos= JSON.stringify(res, null, 2)
 //  console.log("Data received:" + JSON.stringify(res, null, 2));
  // console.log("esto es res ->"+ res);
                
                const dataSource = {
  chart: {
    theme: "fusion",
    caption: "Sales & Profit Analysis",
    subcaption: "For Last Quarter",
    xaxisminvalue: "400",
    xaxismaxvalue: "500",
    yaxisminvalue: "0",
    yaxismaxvalue: "400",
    xaxisname: "Average Price",
    yaxisname: "Units Sold",
    plottooltext: "$name : Promedio goles: $zvalue%  total de goles: $xvalue , promedio suicidios: $yvalue",
    drawquadrant: "1",
    quadrantlabeltl: "Low Price / High Sales",
    quadrantlabeltr: "High Price / High Sales",
    quadrantlabelbl: "Low Price / Low Sales",
    quadrantlabelbr: "High Price / Low Sales",
    quadrantxval: "54",
    quadrantyval: "12000",
    quadrantlinealpha: "50",
    quadrantlinethickness: "2"
  },
  categories: [
    {
      category: [
        {
          label: "0",
          x: "0"
        },
        {
          label: "100",
          x: "100",
          showverticalline: "1"
        },
        {
          label: "200",
          x: "200",
          showverticalline: "1"
        },
        {
          label: "300",
          x: "300",
          showverticalline: "1"
        },
        {
          label: "400",
          x: "400",
          showverticalline: "1"
        },
        {
          label: "500",
          x: "500",
          showverticalline: "1"
        },
        {
          label: "600",
          x: "600",
          showverticalline: "1"
        }
      ]
    }
  ],
  dataset: [
    {
      data: 
       res
      
    }
  ],
  trendlines: [
    {
      line: [
        {
          startvalue: "0",
          endvalue: "500",
          istrendzone: "1",
          color: "#aaaaaa",
          alpha: "14"
        },
        {
          startvalue: "0",
          endvalue: "200",
          istrendzone: "1",
          color: "#aaaaaa",
          alpha: "7"
        }
      ]
    }
  ]
};

FusionCharts.ready(function() {
  var myChart = new FusionCharts({
    type: "bubble",
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