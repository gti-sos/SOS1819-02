/* global angular */

var app = angular.module("AppManager");

app.controller("donaldCtrl", ["$scope", "$http", function($scope, $http) {
    
console.log("Controller initialized.");

    var API = "https://swapi.co/api/people";
    var miAPI = "/api/v1/scorers-stats";
    var starWarsData = [];
    var prueba = [];
    refresh()
     function refresh() {

        console.log("Requesting to <" + API + ">...");
        $http
            .get(API)
            .then(function(response) {
                

                console.log("Data received:" + JSON.stringify(response.data, null, 2));

                 var res = [];
        var responseData = response.data.results;

        console.log(responseData);


        responseData.map(function(i) {
            res.push([i['name'], parseInt(i['height'])]);
        });
        console.log("Aqui vemos el res");
        console.log("uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu"+res);
        
        for (var i=0; i< res.length;i++){
     prueba.push({ "name" :res[i][0], "y": res[i][1]});
   }
  
        
           
        Highcharts.chart('container', {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: 'Browser market shares in January, 2018'
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                style: {
                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                }
            }
        }
    },
    series: [{
        name: 'pelicula',
        colorByPoint: true,
        data: prueba
    }]
});
        
            });       
    }
}]);