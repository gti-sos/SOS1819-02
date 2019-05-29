 /*global angular */
 /*global Highcharts */
 /*global newValue */
 /*global newValue2 */
 /*global google */


 var app = angular.module("AppManager");

 app.controller("grafComCtrl", ["$scope", "$http", "$routeParams", "$location", function($scope, $http, $routeParams, $location) {
     console.log("Companies grafica ctrl Initialized!");
     var API = "/api/v1/companies-stats";


     //HIGHCHART

     $http.get(API).then(function(response) {

         var data = [];

         var countries = response.data.map(function(d) { return d.country });
         var years = response.data.map(function(d) { return d.year });
         var incomes = response.data.map(function(d) { return d.income });


         var chardata2 = response.data.map(function(company) {
             newValue = company.company;
             newValue2 = company.income;

             return [newValue, newValue2];

         });



         Highcharts.chart('container', {
             chart: {
                 type: 'column'
             },
             title: {
                 text: 'Income in the 21st century:'
             },
             subtitle: {
                 text: 'Source: <a href="https://es.wikipedia.org/wiki/Anexo:Empresas_por_ingresos">Wikipedia</a>'
             },
             xAxis: {
                 type: 'companies',
                 title: {
                     text: 'Compañías'
                 },

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
                     text: 'Income (millions)'
                 }
             },
             legend: {
                 enabled: false
             },
             tooltip: {
                 pointFormat: 'Income: <b>{point.y:.1f} millions</b>'
             },
             series: [{
                 name: 'Income',
                 data: chardata2,
                 dataLabels: {
                     enabled: true,
                     rotation: -90,
                     color: 'orange',
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

     //GEOCHART
  $http.get(API).then(function(response) {
        google.charts.load('current', { 'packages': ['geochart'] });
        google.charts.setOnLoadCallback(drawRegionsMap);

        function drawRegionsMap() {
            var data = [];
            data.push(['Compañias', 'Ingresos']);

            var countries = response.data.map(function(d) { return d.country });
            var years = response.data.map(function(d) { return d.year });
            var companies = response.data.map(function(d) { return d.company });

            for (var i = 0; i < countries.length; i++) {
                if (years[i] == 2017) {
                    data.push([countries[i], companies[i]]);
                }
            }
            
            console.log(data);

            var data = google.visualization.arrayToDataTable(data);
            var options = {};
            var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));
            chart.draw(data, options);
        }
    })

 }]);
 