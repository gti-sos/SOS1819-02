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
   
    
          

    $http.get(API).then(function(response){
        countries = response.data.map(function(d) { return d.country });
        years = response.data.map(function(d) { return d.year });
        names = response.data.map(function(d) { return d.name });
        scorergoals = response.data.map(function(d) { return d.scorergoal });
        scorermatches = response.data.map(function(d) { return d.scorermatch });
        scoreraverages = response.data.map(function(d) { return d.scoreraverage });
        
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
      

                   
                    
                    
                    
                    
    });
}]);