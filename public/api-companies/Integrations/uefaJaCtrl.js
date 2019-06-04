/* global angular */

var app = angular.module("AppManager");

app.controller("uefaJaCtrl", ["$scope", "$http", function($scope, $http) {


    console.log("List Uefa club rankings Controller initialized.");

    var API = "https://sos1819-06.herokuapp.com/api/v1/uefa-club-rankings/";
    refresh();

    function refresh() {

        console.log("Requesting  to <" + API + ">...");
        $http
            .get(API)
            .then(function(response) {

                console.log("Data received:" + JSON.stringify(response.data, null, 2));

                $scope.uefaclubrankings = response.data;
            });
    }
    var apiPropia = "/api/v1/companies-stats";
    var api = "https://sos1819-06.herokuapp.com/api/v1/uefa-club-rankings/";



    $http.get(api).then(function(response1) {
        $http.get(apiPropia).then(function(response2) {

    var years = [];

    var data=[];


            var countries = response2.data.map(function(d) { return d.country });
            var years = response2.data.map(function(d) { return d.year });
            var incomes = response2.data.map(function(d) { return d.income });


            var chart = am4core.create("chartdiv", am4charts.RadarChart);
            // Themes begin
            am4core.useTheme(am4themes_animated);
            // Themes end

            // Create chart instance
            var chart = am4core.create("chartdiv", am4charts.XYChart3D);

           
            chart.data = [{
                "year": data[0].year,
                "country": data[0].country,
                "color": chart.colors.next()
            }, {
                "year": data[5].year,
                "country": data[5].country,
                "color": chart.colors.next()
            }, {
                "year": data[6].year,
                "country": data[6].country,
                "color": chart.colors.next()
            }];
            console.log("auxAmChart:");
            //        console.log(JSON.stringify(auxAmChart,null,2));

            // Create axes
            var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
            categoryAxis.dataFields.category = "year";
            categoryAxis.numberFormatter.numberFormat = "#";
            categoryAxis.renderer.inversed = true;

            var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());

            // Create series
            var series = chart.series.push(new am4charts.ColumnSeries3D());
            series.dataFields.valueX = "country";
            series.dataFields.categoryY = "year";
            series.name = "country";
            series.columns.template.propertyFields.fill = "color";
            series.columns.template.tooltipText = "{valueX}";
            series.columns.template.column3D.stroke = am4core.color("#fff");
            series.columns.template.column3D.strokeOpacity = 0.2;

        });
    });
}]);
