 /*global angular */
  /*global Highcharts */

 
var app = angular.module("AppManager");

app.controller("grafComCtrl", ["$scope", "$http", "$routeParams", "$location", function($scope, $http, $routeParams, $location) {
    console.log("Companies grafica ctrl Initialized!");
    var API = "/api/v1/companies-stats";
    var companies = [];
    var countries = [];
    var years = [];
    var incomes = [];
    var marketcapitalizations = [];
    var employees = [];


    var data = [];
    $http.get(API).then(function(response) {
        countries = response.data.map(function(d) { return d.country });
        years = response.data.map(function(d) { return d.year });
        companies = response.data.map(function(d) { return d.company });
        incomes = response.data.map(function(d) { return d.income });
        marketcapitalizations = response.data.map(function(d) { return d.marketcapitalization });
        employees = response.data.map(function(d) { return d.employee });

        data = response.data;
        console.log(companies[1]);


        Highcharts.chart('container', {
            chart: {
                type: 'bar'
            },
            title: {
                text: ''
            },
      
            xAxis: {
                categories: countries,
                title: {
                    text: null
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Income ',
                    align: 'high'
                },
                labels: {
                    overflow: 'justify'
                }
            },
            tooltip: {
                valueSuffix: ' millions'
            },
            plotOptions: {
                bar: {
                    dataLabels: {
                        enabled: true
                    }
                }
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'top',
                x: -40,
                y: 80,
                floating: true,
                borderWidth: 1,
                backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
                shadow: true
            },
            credits: {
                enabled: false
            },
            series: [{
                name: 'Year 1800',
                data: [107, 31, 63, 203, 2, 3, 5, 7]
            }, {
                name: 'Year 1900',
                data: [133, 156, 97, 408, 6, 3, 5, 7]
            }, {
                name: 'Year 2000',
                data: [84, 841, 14, 727, 31, 3, 5, 7]
            }, {
                name: 'Year 2016',
                data: [126, 101, 100, 738, 40,  3, 5, 7]
            }, {
                name: 'Year 2012',
                data: [116, 101, 436, 738, 40,  3, 5, 7]
            }, {
                name: 'Year 2013',
                data: [116, 101, 55, 738, 40, 3, 5, 7, 55, 213, 254]
            }]
        });






    });
}]);
