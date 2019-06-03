/* global angular */

var app = angular.module("AppManager");

app.controller("formula1Ctrl", ["$scope", "$http", "$routeParams", function($scope, $http, $routeParams) {
        var API = "https://ergast.com/api/f1/drivers.json?limit=100";
        var apimia= "https://sos1819-02.herokuapp.com/api/v1/movies-stats"

        console.log("List Formula1 Controller initialized.");

    refresh();

    function refresh() {

        console.log("Requesting movies to <" + API + ">...");
        $http
            .get(API)
            .then(function(response) {

                console.log("Data received:" + JSON.stringify(response.data, null, 2));

var aux = []
var aux1 = []
var res = response.data
   
for (var i=0; i< res.length;i++){
     aux.push(res[i].MRData.DriverTable.Drivers);
   }   
    response.data.MRData.DriverTable.Drivers.forEach(e => {
                aux1.push([e.driverId, e.driverId.length])
            });

console.log("aaaa :"+ aux[0]);

    Highcharts.chart('container', {

    chart: {
        type: 'item'
    },

    title: {
        text: 'Highcharts item chart'
    },

    subtitle: {
        text: 'Parliament visualization'
    },

    legend: {
        labelFormat: '{name} <span style="opacity: 0.4">{y}</span>'
    },

    series: [{
        name: 'Representatives',
        keys: ['name', 'y', 'color', 'label'],
        data: aux1,
        dataLabels: {
            enabled: true,
            format: '{point.label}'
        },

        // Circular options
        center: ['50%', '88%'],
        size: '170%',
        startAngle: -100,
        endAngle: 100
    }]
});

                
                
                
            });
    }

}]);
