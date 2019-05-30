var app = angular.module("AppManager");


app.controller("grafMoviesCtrl", ["$scope","$http","$routeParams", "$location", function ($scope, $http,$routeParams,$location){
                    console.log("movies moviesGraphCtrl Initialized!");
                    var API = "/api/v1/movies-stats";
                    
    var countries = [];
    var years = [];
    var names = [];
    var movienomination = [];
    var movieawards = [];
    var movieedition = [];
 
    var data=[];


    $http.get(API).then(function(response){
        countries = response.data.map(function(d) { return d.country });
        years = response.data.map(function(d) { return d.year });
        names = response.data.map(function(d) { return d.name });
         console.log("nombre: "+names);

        movienomination = response.data.map(function(d) { return d.movienomination });
        movieawards = response.data.map(function(d) { return d.movieawards });
        movieedition = response.data.map(function(d) { return d.movieedition });
        
        data= response.data;
        console.log(data);
     //   console.log(names[1]);

 
var chardata = [names , movieawards];
   
var chardata2 = response.data.map(function(movie){
	newValue = movie.movieaward ;
    newValue2 = movie.name ;

return [newValue2 , newValue];
});

var chardata3 = response.data.map(function(movie){
	newValue = movie.movieaward ;
    newValue2 = movie.country ;

return [newValue2 , newValue];
});
   
        //////////Highcharts 3D Charts////////////////////
        
       // Set up the chart
Highcharts.chart('container', {
    chart: {
        type: 'pyramid3d',
        options3d: {
            enabled: true,
            alpha: 10,
            depth: 50,
            viewDistance: 50
        }
    },
    title: {
        text: 'Películas más premiadas en los Oscars'
    },
    plotOptions: {
        series: {
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b> ({point.y:,.0f})',
                color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black',
                allowOverlap: true,
                x: 10,
                y: -5
            },
            width: '60%',
            height: '80%',
            center: ['50%', '45%']
        }
    },
    series: [{
        name: 'Premios Oscars',
        data: chardata2
        
    }]
});

                    //////////GeoChart////////////////////


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
                    aux.push(["Country", "Nº Oscars"]);
                    aux.push([data[5].country, data[5].movieaward]);
                    aux.push([data[6].country, data[6].movieaward]);

                    console.log(aux);
                    var plot = google.visualization.arrayToDataTable(aux);

                    var options = {};

                    var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

                    chart.draw(plot, options);
                }
            });
        
    
                              //////////AmChart///////////////////

 
                   
                                
            // Themes begin
            am4core.useTheme(am4themes_animated);
            // Themes end
            
            // Create chart instance
            var chart = am4core.create("chartdiv", am4charts.XYChart3D);
            
            // Add data
 /*
               var auxAmChart = response.data.map(function(movie){
	newValue = movie.year ;
    newValue2 = movie.movieaward ;    
    return [newValue , newValue2, chart.colors.next()];
    });
    */
            chart.data = [{
  "year": data[0].year,
  "movieaward": data[0].movieaward,
  "color": chart.colors.next()
}, {
 "year": data[6].year,
  "movieaward": data[6].movieaward,
  "color": chart.colors.next()
}];
         console.log("auxAmChart:");
    //        console.log(JSON.stringify(auxAmChart,null,2));
            
            // Create axes
            var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
            categoryAxis.dataFields.category = "year";
            categoryAxis.numberFormatter.numberFormat = "#";
            categoryAxis.renderer.inversed = true;
            
            var  valueAxis = chart.xAxes.push(new am4charts.ValueAxis()); 
            
            // Create series
            var series = chart.series.push(new am4charts.ColumnSeries3D());
            series.dataFields.valueX = "movieaward";
            series.dataFields.categoryY = "year";
            series.name = "Movieaward";
            series.columns.template.propertyFields.fill = "color";
            series.columns.template.tooltipText = "{valueX}";
            series.columns.template.column3D.stroke = am4core.color("#fff");
            series.columns.template.column3D.strokeOpacity = 0.2;
                                
});
}]);