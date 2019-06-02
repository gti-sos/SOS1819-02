/* global angular Highcharts */

angular
    .module("AppManager")
    .controller("biofuels1Ctrl", ["$scope", "$http", function($scope, $http) { //$scope permite acceder a los datos, al modelo.
        //$http establece la conexión entre el navegador del usuario y el servidor (backend).

        console.log("Biofuels Controller initialized");

        var apiBiofuels = "https://sos1819-10.herokuapp.com/api/v2/biofuels-production";
        var apiMovies = "https://sos1819-02.herokuapp.com/api/v1/movies-stats";


        $http.get(apiBiofuels).then(function(response1) {
                $http.get(apiMovies).then(function(response2) {
                   
                   ////////////AMCHARTS//////////

                   
           console.log("Data Biofuels received:" + JSON.stringify(response1.data, null, 2));
            console.log("Data Movies received:" + JSON.stringify(response2.data, null, 2));


var aux = []

var res1 = response2.data

var res2 = response1.data

for (var i=0; i< res1.length;i++){
     aux.push({
  "name": res2[i].country,
  "value": res1[i].movieaward
});
   }



console.log("aux :"+ aux);


                   
                   // Themes begin
am4core.useTheme(am4themes_animated);
// Themes end

var chart = am4core.create("chartdiv", am4charts.SlicedChart);
chart.paddingBottom = 30;
chart.data =aux;

var series = chart.series.push(new am4charts.PyramidSeries());
series.dataFields.value = "value";
series.dataFields.category = "name";
series.alignLabels = true;
series.valueIs = "height";
                   
                   
                   
                });

        });


    }]);