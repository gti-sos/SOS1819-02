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

var aux1 = []
    response.data.MRData.DriverTable.Drivers.forEach(e => {
                aux1.push([e.driverId])
            });

console.log("aaaa :"+ aux1[0]);

                Highcharts.chart('container', {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: 0,
        plotShadow: false
    },
    title: {
        text: 'Algunos<br>Pilotos<br>F1',
        align: 'center',
        verticalAlign: 'middle',
        y: 40
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
        pie: {
            dataLabels: {
                enabled: true,
                distance: -50,
                style: {
                    fontWeight: 'bold',
                    color: 'white'
                }
            },
            startAngle: -90,
            endAngle: 90,
            center: ['50%', '75%'],
            size: '110%'
        }
    },
    series: [{
        type: 'pie',
        name: 'Pilotos F1',
        innerSize: '50%',
        data: [
            [aux1[0][0], 1],
            [aux1[1][0], 1],
            [aux1[2][0], 1],
            {
                name: 'Other',
                y: 7.61,
                dataLabels: {
                    enabled: false
                }
            }
        ]
    }]
});
                
                
                
            });
    }

}]);
