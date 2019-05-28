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
                text: 'Historic World Population by Region'
            },
            subtitle: {
                text: 'Source: <a href="https://en.wikipedia.org/wiki/World_population">Wikipedia.org</a>'
            },
            xAxis: {
                categories: ['Africa', 'America', 'Asia', 'Europe', 'Oceania'],
                title: {
                    text: null
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Population (millions)',
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
                data: [107, 31, 635, 203, 2]
            }, {
                name: 'Year 1900',
                data: [133, 156, 947, 408, 6]
            }, {
                name: 'Year 2000',
                data: [814, 841, 3714, 727, 31]
            }, {
                name: 'Year 2016',
                data: [1216, 1001, 4436, 738, 40]
            }]
        });






    });
}]);
