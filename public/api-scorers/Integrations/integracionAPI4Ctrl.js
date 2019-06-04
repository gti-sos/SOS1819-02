/* global angular */

var app = angular.module("AppManager");

app.controller("peliculasCtrl", ["$scope", "$http", function($scope, $http) {


    console.log("Controller initialized.");

    var API = "https://sos1819-02.herokuapp.com/api/v1/movies-stats";
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
               
                
                var year1 = response.data.map(function(d) { return d.year });
                var year2 = response1.data.map(function(d) { return d.year });
                var edition = response.data.map(function(d) { return d.movieedition });
                var goles = response1.data.map(function(d) { return d.scorergoal });
                var res = []
               var i =0;
                
//                 while(i<year2.length){
//                     res.push({
//   "year": year1[i],
//   "income": edition[i],
//   "color": chart.colors.next()
// });
//                     i++;
//                 }
                am4core.ready(function() {

// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end

// Create chart instance
var chart = am4core.create("chartdiv", am4charts.XYChart3D);

// Add data
chart.data =[{
  "year": year1[0],
  "income": edition[0],
  "color": chart.colors.next()
},{
  "year": year1[1],
  "income": edition[1],
  "color": chart.colors.next()
},{
  "year": year1[2],
  "income": edition[2],
  "color": chart.colors.next()
},{
  "year": year1[3],
  "income": edition[3],
  "color": chart.colors.next()
},{
  "year": year2[0],
  "income": goles[0],
  "color": chart.colors.next()
},{
  "year": year2[1],
  "income": goles[1],
  "color": chart.colors.next()
},{
  "year": year2[2],
  "income": goles[2],
  "color": chart.colors.next()
},{
  "year": year2[3],
  "income": goles[3],
  "color": chart.colors.next()
}];

// Create axes
var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
categoryAxis.dataFields.category = "year";
categoryAxis.numberFormatter.numberFormat = "#";
categoryAxis.renderer.inversed = true;

var  valueAxis = chart.xAxes.push(new am4charts.ValueAxis()); 

// Create series
var series = chart.series.push(new am4charts.ColumnSeries3D());
series.dataFields.valueX = "income";
series.dataFields.categoryY = "year";
series.name = "Income";
series.columns.template.propertyFields.fill = "color";
series.columns.template.tooltipText = "{valueX}";
series.columns.template.column3D.stroke = am4core.color("#fff");
series.columns.template.column3D.strokeOpacity = 0.2;

});

            }); 
            });
    }

}]);