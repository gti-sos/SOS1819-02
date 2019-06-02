/* global angular */

var app = angular.module("AppManager");

app.controller("extCtrl", ["$scope", "$http", function($scope, $http) {


    console.log("Controller initialized.");

   var API = "https://restcountries.eu/rest/v2/regionalbloc/eu";
    refresh();

    function refresh() {

        console.log("Requesting to <" + API + ">...");
        $http
            .get(API)
            .then(function(response) {

            //    console.log("Data received:" + JSON.stringify(response.data, null, 2));
        var unionEuropea = [];
        var nombres = [];
        var population = [];
        nombres = response.data.map(function(d) { return d.name });
        population = response.data.map(function(d) { return d.population });
        console.log("esto son los nombres" +population);

        var responseData = (response.data);
        console.log(responseData)

    var res = [];
        
        for (var i=0; i< nombres.length;i++){
     res.push([nombres[i], population[i]]);
   }
        console.log("res------------->" + res)
        

              //  $scope.exts= response.data;
           
        Highcharts.chart('container', {
    chart: {
        type: 'funnel'
    },
    title: {
        text: 'popularidad de los paises',
        x: -50
    },
    plotOptions: {
        series: {
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b> ({point.y:,.0f})',
                color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black',
                softConnector: true
            },
            center: ['40%', '50%'],
            width: '80%'
        }
    },
    legend: {
        enabled: false
    },
    series: [{
        name: 'Unique users',
        data:
            res
        
    }]
        });
});
    }

}]);