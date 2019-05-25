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
        var j=0;
           

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
            html: 'Total goles y partidos',
            style: {
                left: '50px',
                top: '18px',
                color: (Highcharts.theme && Highcharts.theme.textColor) || 'black'
            }
        }]
    },
    series:[
        {
        type: 'column',
        name: names[j],
        data: [scorergoals[j],scorermatches[j],scoreraverages[j]],
        operation: j=j+1
        ,
    }, {
        type: 'column',
        name: names[j],
        data: [scorergoals[j],scorermatches[j],scoreraverages[j]],
        operation: j=j+1,
    }, {
        type: 'column',
        name: names[j],
        data: [scorergoals[j],scorermatches[j],scoreraverages[j]],
        operation: j=j+1,
    }, {
        type: 'spline',
        name: 'Media',
        operation: j=0,
        data: [(scorergoals[j]+scorergoals[j+1]+scorergoals[j+2])/3,
        (scorermatches[j]+scorermatches[j+1]+scorermatches[j+2])/3,
        (scoreraverages[j]+scoreraverages[j+1]+scoreraverages[j+2])/3],
    },{
        marker: {
            lineWidth: 2,
            lineColor: Highcharts.getOptions().colors[3],
            fillColor: 'white'
        }
    }, {
        type: 'pie',
        operation: j=0,
        name: 'Total consumption',
        data: [{
            name: names[j],
            y: scorergoals[j]+scorermatches[j],
            color: Highcharts.getOptions().colors[0], // Jane's color
            operation: j=j+1,
        }, {
            name: names[j],
            y: scorergoals[j]+scorermatches[j],
            color: Highcharts.getOptions().colors[1], // John's color
            operation: j=j+1,
        }, {
            name: names[j],
            y: scorergoals[j]+scorermatches[j],
            color: Highcharts.getOptions().colors[2], // Joe's color
            operation: j=j+1,
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