 /*global angular */
 /*global Highcharts */
 /*global newValue */
 /*global newValue2 */
 /*global google */


 var app = angular.module("AppManager");

 app.controller("grafComCtrl", ["$scope", "$http", "$routeParams", "$location", function($scope, $http, $routeParams, $location) {
     console.log("Companies grafica ctrl Initialized!");
     var API = "/api/v1/companies-stats";
     var countries = [];
     var years = [];
     var incomes = [];

     var data = [];
     $http.get(API).then(function(response) {

         countries = response.data.map(function(d) { return d.country });
         years = response.data.map(function(d) { return d.year });
         incomes = response.data.map(function(d) { return d.income });


         var chardata2 = response.data.map(function(company) {
             newValue = company.company;
             newValue2 = company.income;

             return [newValue, newValue2];

         });


         //HIGHCHART

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
                     text: 'Companies'
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
                     y: 11, // 10 pixels down from the top
                     style: {
                         fontSize: '13px',
                         fontFamily: 'Verdana, sans-serif'
                     }
                 }



             }]
         });

         //GEOCHART

         $http.get(API).then(function(response) {
             google.charts.load('current', {

                 'packages': ['geochart'],
                 // Note: you will need to get a mapsApiKey for your project.
                 // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
                 'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
             });
             google.charts.setOnLoadCallback(drawRegionsMap);

             function drawRegionsMap() {
                 var aux = [];
                 aux.push(["Country", "Ingresos"]);
                 aux.push([countries[7],incomes[7]]);
                 aux.push([countries[6],incomes[6]]);

                 console.log(aux);
                 var plot = google.visualization.arrayToDataTable(aux);

                 var options = {};

                 var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

                 chart.draw(plot, options);
             }
         });
        
     });
 }]);
 