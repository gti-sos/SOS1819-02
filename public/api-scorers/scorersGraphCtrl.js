var app = angular.module("AppManager");


app.controller("grafCtrl", ["$scope","$http","$routeParams", "$location", function ($scope, $http,$routeParams,$location){
                    console.log("Scorers editCtrl Initialized!");
                    var API = "/api/v1/scorers-stats";
                    
    var countries = [];
    var years = [];
    var names = [];
    var scorergoals = [];
    var scorermatches = [];
    var scoreraverages = [];
   
   
   var goles=[]; //para fusionCharts
   var nombres=[];
   var partidos=[];
   var promedios=[];
   

    $http.get(API).then(function(response){
        countries = response.data.map(function(d) { return d.country });
        years = response.data.map(function(d) { return d.year });
        names = response.data.map(function(d) { return d.name });
        scorergoals = response.data.map(function(d) { return d.scorergoal });
        scorermatches = response.data.map(function(d) { return d.scorermatch });
        scoreraverages = response.data.map(function(d) { return d.scoreraverage });
        
        for (var i=0; i< names.length;i++){
     goles.push({ "value" :scorergoals[i]});
   }
    
       console.log("los goles-> "+goles); 
       
       for (var i=0; i< names.length;i++){
     nombres.push({ "label" :names[i]});
   }
   
   for (var i=0; i< names.length;i++){
     partidos.push({ "value" :scorermatches[i]});
   }
   
   for (var i=0; i< names.length;i++){
     promedios.push({ "value" :scoreraverages[i]});
   }
    
        
 Highcharts.chart('container', {
    chart: {
        type: 'line'
    },
    title: {
        text: 'Highcharts'
    },
    subtitle: {
        text: 'Scorers'
    },
    xAxis: {
        text: 'jugadores',
        categories: names
    },
    yAxis: {
        title: {
            text: 'Cantidad'
        }
    },
    plotOptions: {
        line: {
            dataLabels: {
                enabled: true
            },
            enableMouseTracking: false
        }
    },
    series: [{
        name: 'goles',
        data: scorergoals
    }, {
        name: 'Partidos jugados',
        data: scorermatches
    }, {
        name: 'Promedio',
        data: scoreraverages
    }]
});
        
// Geo Chart
      google.charts.load('current', {
        'packages':['geochart'],
        // Note: you will need to get a mapsApiKey for your project.
        // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
        'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
      });
      google.charts.setOnLoadCallback(drawRegionsMap);

      function drawRegionsMap() {
        var aux = [];
        aux.push(["Country","Número de goles"]);
        aux.push([countries[5],scorergoals[5]]);
        aux.push([countries[6],scorergoals[6]]);
        
        console.log(aux);
        var plot = google.visualization.arrayToDataTable(aux);
        

        var options = {};

        var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

        chart.draw(plot, options);
      }

// FusionChart
const dataSource = {
  chart: {
    caption: "FusionCharts",
    xaxisname: "Jugadores",
    formatnumberscale: "0.5",
    plottooltext:
      "<b>$dataValue</b> apps were available on <b>$seriesName</b> in $label",
    theme: "fusion",
    drawcrossline: "1"
  },
  categories: [
    {
      category: nombres
    }
  ],
  dataset: [
    {
      seriesname: "Goles",
      data: goles
    },
    {
      seriesname: "Partidos jugados",
      data: partidos
    },
    {
      seriesname: "Promedio",
      data: promedios
    }
  ]
};

FusionCharts.ready(function() {
  var myChart = new FusionCharts({
    type: "mscolumn2d",
    renderAt: "chart-container",
    width: "100%",
    height: "100%",
    dataFormat: "json",
    dataSource
  }).render();
});
                   
                    
                    
                    
                    
    });
}]);