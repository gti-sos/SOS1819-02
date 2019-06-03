/* global angular Highcharts */

angular
    .module("AppManager")
    .controller("countryCtrl", ["$scope", "$http", function($scope, $http) { //$scope permite acceder a los datos, al modelo.
        //$http establece la conexión entre el navegador del usuario y el servidor (backend).

        console.log("Country Controller initialized");

        var apiCountry = "https://sos1819-03.herokuapp.com/api/v1/country-stats/";
        var apiMovies = "https://sos1819-02.herokuapp.com/api/v1/movies-stats";


        $http.get(apiCountry).then(function(response1) {
                $http.get(apiMovies).then(function(response2) {
                   
                   ////////////AMCHARTS//////////

                   
           console.log("Data Country received:" + JSON.stringify(response1.data, null, 2));
            console.log("Data Movies received:" + JSON.stringify(response2.data, null, 2));


var aux = []

var res1 = response1.data

var res2 = response2.data

for (var i=0; i< res2.length;i++){
     aux.push({
            "category": res1[i].country,
            "value1": res2[i].movieaward
            });
   }



console.log("aux :"+ aux);


 
                    //////////AMCHARTS  Miscellaneous cilynder Gauge////////////////////
                    
                    
                    
            // Themes begin
            am4core.useTheme(am4themes_animated);
            // Themes end
            
            // Create chart instance
            var chart = am4core.create("chartdiv", am4charts.XYChart3D);
            
            chart.titles.create().text = "Crude oil reserves";
            
            // Add data
            chart.data = aux;
            
            // Create axes
            var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
            categoryAxis.dataFields.category = "category";
            categoryAxis.renderer.grid.template.location = 0;
            categoryAxis.renderer.grid.template.strokeOpacity = 0;
            
            var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
            valueAxis.renderer.grid.template.strokeOpacity = 0;
            valueAxis.min = -10;
            valueAxis.max = 110;
            valueAxis.strictMinMax = true;
            valueAxis.renderer.baseGrid.disabled = true;
            valueAxis.renderer.labels.template.adapter.add("text", function(text) {
            if ((text > 100) || (text < 0)) {
            return "";
            }
            else {
            return text + "%";
            }
            })
            
            // Create series
            var series1 = chart.series.push(new am4charts.ConeSeries());
            series1.dataFields.valueY = "value1";
            series1.dataFields.categoryX = "category";
            series1.columns.template.width = am4core.percent(80);
            series1.columns.template.fillOpacity = 0.9;
            series1.columns.template.strokeOpacity = 1;
            series1.columns.template.strokeWidth = 2;
            
            var series2 = chart.series.push(new am4charts.ConeSeries());
            series2.dataFields.valueY = "value2";
            series2.dataFields.categoryX = "category";
            series2.stacked = true;
            series2.columns.template.width = am4core.percent(80);
            series2.columns.template.fill = am4core.color("#000");
            series2.columns.template.fillOpacity = 0.1;
            series2.columns.template.stroke = am4core.color("#000");
            series2.columns.template.strokeOpacity = 0.2;
            series2.columns.template.strokeWidth = 2;
                    
                    
                    
            });
                   
                   
                });

       


    }]);