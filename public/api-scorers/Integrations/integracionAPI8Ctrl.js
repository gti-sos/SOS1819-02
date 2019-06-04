/* global angular */

var app = angular.module("AppManager");

app.controller("carCtrl", ["$scope", "$http", function($scope, $http) {


    console.log("Controller initialized.");

    var API = "https://sos1819-10.herokuapp.com/api/v1/e-car-statics";
    var API2 = "/api/v1/scorers-stats";
    refresh();

    function refresh() {

        console.log("Requesting to <" + API + ">...");
        $http
            .get(API)
            .then(function(response) {
        console.log("Requesting to <" + API + ">...");
        $http
            .get(API2)
            .then(function(response1) {

                console.log("Data received:" + JSON.stringify(response.data, null, 2));

                $scope.cars= response.data;
                console.log("aaaa");
                var year1 = response.data.map(function(d) { return d.year });
                var country1 = response.data.map(function(d) { return d.country });
                var year2 = response1.data.map(function(d) { return d.year });
                var country2 = response1.data.map(function(d) { return d.country });
                var promediogoles = response1.data.map(function(d) { return d.scoreraverage });
                var disponibles = response1.data.map(function(d) { return d.marketPart });
                
                 var res = []
                
                var i =0;
                
                while(i<year2.length){
                    res.push({
    country: country1[i]+" "+year1[i],
    value: disponibles[i]
  },
  {
    country: country2[i]+" "+year2[i],
    value: promediogoles[i]
  });
                    i++;
                }
                am4core.useTheme(am4themes_animated);
// Themes end

// Create chart
var chart = am4core.create("chartdiv", am4charts.PieChart);
chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

chart.data = res;

var series = chart.series.push(new am4charts.PieSeries());
series.dataFields.value = "value";
series.dataFields.radiusValue = "value";
series.dataFields.category = "country";
series.slices.template.cornerRadius = 6;
series.colors.step = 3;

series.hiddenState.properties.endAngle = -90;

chart.legend = new am4charts.Legend();
                
                
            });  
            });
    }

}]);