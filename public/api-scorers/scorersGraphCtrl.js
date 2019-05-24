var app = angular.module("AppManager");


app.controller("grafCtrl", ["$scope","$http","$routeParams", "$location", function ($scope, $http,$routeParams,$location){
                    console.log("Scorers editCtrl Initialized!");
                    var API = "/api/v1/scorers-stats";
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
    
        var data=[];
           

    $http.get(API).then(function(response){
        countries = response.data.map(function(d) { return d.country });
        years = response.data.map(function(d) { return d.year });
        names = response.data.map(function(d) { return d.name });
        scorergoals = response.data.map(function(d) { return d.scorergoal });
        scorermatches = response.data.map(function(d) { return d.scorermatch });
        scoreraverages = response.data.map(function(d) { return d.scoreraverage });
        
        data= response.data;
        console.log(names[1]);

        countryandyear = response.data.map(function(d) { return d.country + " " + d.year });
        sumas = response.data.map(function(d) { return d.scorergoal + d.scorermatch + d.scoreraverage });

        CandProperties = countryandyear.map(function(n, i) {
            return {
                name: countryandyear[i],
                data: [scorergoals[i], scorermatches[i], scoreraverages[i]]
            };
        });
        CandYsumas = countryandyear.map(function(n, i) {
            return [n, sumas[i]];
        });
        
        CandYsumas.unshift(['Country', 'Unemployments']);
        
        
        
        //Highcharts Basic Columnpie
        Highcharts.chart('container', {
            chart: {
                type: 'column'
            },
            title: {
                text: 'total Scorers by country and year'
            },
            subtitle: {
                text: 'in ES'
            },
            xAxis: {
                categories: [
                    "Goles", "Partidos", "Relacion"
                ],
                crosshair: true
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'number of jugadores'
                }
            },
    labels: {
        items: [{
            html: 'Total fruit consumption',
            style: {
                left: '50px',
                top: '18px',
                color: (Highcharts.theme && Highcharts.theme.textColor) || 'black'
            }
        }]
    },
    series: [{
        type: 'column',
        name: names[0],
        data: [scorergoals[0],scorermatches[0],scoreraverages[0]]
    }, {
        type: 'column',
        name: 'John',
        data: [2, 3, 5, 7, 6]
    }, {
        type: 'column',
        name: 'Joe',
        data: [4, 3, 3, 9, 0]
    }, {
        type: 'spline',
        name: 'Average',
        data: [3, 2.67, 3, 6.33, 3.33],
        marker: {
            lineWidth: 2,
            lineColor: Highcharts.getOptions().colors[3],
            fillColor: 'white'
        }
    }, {
        type: 'pie',
        name: 'Total consumption',
        data: [{
            name: "alw",
            y: 13,
            color: Highcharts.getOptions().colors[0] // Jane's color
        }, {
            name: 'piterlangi',
            y: 23,
            color: Highcharts.getOptions().colors[1] // John's color
        }, {
            name: 'Joe',
            y: 19,
            color: Highcharts.getOptions().colors[2] // Joe's color
        }],
        center: [100, 80],
        size: 100,
        showInLegend: false,
        dataLabels: {
            enabled: false
        }
    }]
});

                   
                    
                    
                    
                    
    });
}]);