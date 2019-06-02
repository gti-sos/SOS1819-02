/* global angular */

var app = angular.module("AppManager");

app.controller("tiempoCtrl", ["$scope", "$http", "$routeParams", function($scope, $http, $routeParams) {
        var API = "https://simple-weather.p.mashape.com/weatherdata?lat=40.0&lng=-3.0&mashape-key=d8593BVX5dmshF2FTxE1j7VTjI1fp1NZA3ijsnlGTaAgUqSAaE";

        console.log("List TiempoController initialized.");

    refresh();
    

    function refresh() {

        console.log("Requesting movies to <" + API + ">...");
        $http
            .get(API)
            .then(function(response) {

                console.log("Data received:" + JSON.stringify(response.data.forecasts[0].day, null, 2));

var forecasts = []

var res = response.data.forecasts

for (var i=0; i< res.length;i++){
     forecasts.push([ res[i].day , res[i].high ]);
   }

console.log("forecasts :"+ forecasts);
                
                //////////////////////////////////////////////////////////////////////
                
 Highcharts.chart('container', {
    chart: {
        type: 'column'
    },
    title: {
        text: 'El tiempo en Castilla La Mancha'
    },
    subtitle: {
        text: 'Source: <a href="https://simple-weather.p.mashape.com/weatherdata?lat=40.0&lng=-3.0&mashape-key=d8593BVX5dmshF2FTxE1j7VTjI1fp1NZA3ijsnlGTaAgUqSAaE">Enlace API</a>'
    },
    xAxis: {
        type: 'category',
        labels: {
            rotation: -45,
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif'
            }
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Temperatura (ºFarenheit)'
        }
    },
    legend: {
        enabled: false
    },
    tooltip: {
        pointFormat: 'Temperatura Farenheit: <b>{point.y:.1f} ºF</b>'
    },
    series: [{
        name: 'Temperatura Farenheit',
        data: forecasts,
        dataLabels: {
            enabled: true,
            rotation: -90,
            color: '#FFFFFF',
            align: 'right',
            format: '{point.y:.1f}', // one decimal
            y: 10, // 10 pixels down from the top
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif'
            }
        }
    }]
});
                
                
            });
    }

}]);
