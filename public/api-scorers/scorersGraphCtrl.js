/* global angular */ /* global d3 */ /* global Highcharts*/ /* global google*/
angular.module("AppManager")
.controller("ScorersView", ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer) {

    console.log("UnemploymentsView initialized!");
    var countries = [];
    var years = [];
    var names = [];
    var scorergoals = [];
    var scorermatches = [];
    var scoreraverages = [];
    var sumas = [];
    var CandYsumas = [];
    var countryandyear = [];
    var CandProperties = [];

    function d3Chart(data) {
        var bubbleChart = new d3.svg.BubbleChart({
            supportResponsive: true,
            container: document.querySelector('.bubbleChart'),
            size: 1000,
            //viewBoxSize: => use @default
            innerRadius: 300 / 1,
            //outerRadius: => use @default
            radiusMin: 40,
            radiusMax: 60,
            //intersectDelta: use @default
            //intersectInc: use @default
            //circleColor: use @default,
            data: {
                items: data,
                eval: function(item) { return item.count; },
                classed: function(item) { return item.text.split(" ").join(""); }
            },
            plugins: [{
                name: "lines",
                options: {
                    format: [{ // Line #0
                            textField: "count",
                            classed: { count: true },
                            style: {
                                "font-size": "30px",
                                "font-family": "Source Sans Pro, sans-serif",
                                "text-anchor": "middle",
                                fill: "white"
                            },
                            attr: {
                                dy: "0px",
                                x: function(d) { return d.cx; },
                                y: function(d) { return d.cy; }
                            }
                        },
                        { // Line #1
                            textField: "text",
                            classed: { text: true },
                            style: {
                                "font-size": "30px",
                                "font-family": "Source Sans Pro, sans-serif",
                                "text-anchor": "middle",
                                fill: "white"
                            },
                            attr: {
                                dy: "20px",
                                x: function(d) { return d.cx; },
                                y: function(d) { return d.cy; }
                            }
                        }
                    ],
                    centralFormat: [{ // Line #0
                            style: { "font-size": "30px" },
                            attr: {}
                        },
                        { // Line #1
                            style: { "font-size": "30px" },
                            attr: { dy: "40px" }
                        }
                    ]
                }
            }]
        });
    }

    $http.get("/api/v1/scorers-stats").then(function(response) {
        countries = response.data.map(function(d) { return d.country });
        years = response.data.map(function(d) { return d.year });
        names = response.data.map(function(d) { return d.name });
        scorergoals = response.data.map(function(d) { return d.scorergoal });
        scorermatches = response.data.map(function(d) { return d.scorermatch });
        scoreraverages = response.data.map(function(d) { return d.scoreraverage });

        countryandyear = response.data.map(function(d) { return d.country + " " + d.year });
        sumas = response.data.map(function(d) { return d.scorergoal + d.scorermatch + d.name + d.scoreraverage });

        CandProperties = countryandyear.map(function(n, i) {
            return {
                name: countryandyear[i],
                data: [names[i], scorergoals[i], scorermatches[i], scoreraverages[i]]
            };
        });
        CandYsumas = countryandyear.map(function(n, i) {
            return [n, sumas[i]];
        });
        
        CandYsumas.unshift(['Country', 'Scorers']);
        
        //Highcharts Basic Columnpie
        Highcharts.chart('container', {
            chart: {
                type: 'column'
            },
            title: {
                text: 'total scorers by country and year'
            },
            subtitle: {
                text: 'in ES'
            },
            xAxis: {
                categories: [
                    "Name", "scorergoal", "scorermatch", "scoreraverage"
                ],
                crosshair: true
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'number of    scorers'
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f} %</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: CandProperties
        });

        //Geochart de GOOGLE
        google.charts.load('current', {
            'packages': ['geochart'],
            // Note: you will need to get a mapsApiKey for your project.
            // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
            'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
        });
        google.charts.setOnLoadCallback(drawRegionsMap);

        function drawRegionsMap() {
            var data = google.visualization.arrayToDataTable(
                CandYsumas
            );

            var options = { region: '150' };
            var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));
            chart.draw(data, options);
        }

        //OTRO
        var d3data = countryandyear.map(function(name, index) {
            return {
                text: name,
                count: parseInt(sumas[index])
            };
        });

        d3Chart(d3data);
    });
}]);