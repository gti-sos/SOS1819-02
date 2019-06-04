/* global angular */

var app = angular.module("AppManager");

app.controller("uefaCtrl", ["$scope", "$http", function($scope, $http) {


    console.log("Controller initialized.");

    var API = "https://sos1819-06.herokuapp.com/api/v1/uefa-country-rankings";
    var API2 = "/api/v1/scorers-stats";
    refresh();

    function refresh() {

        console.log("Requesting to <" + API + ">...");
        $http
            .get(API)
            .then(function(response) {

                console.log("Data received:" + JSON.stringify(response.data, null, 2));

                $scope.uefas = response.data;
                $http
            .get(API2)
            .then(function(response1) {
                console.log("Data received:" + JSON.stringify(response.data, null, 2));

                $scope.expcountries = response.data;
                var countries1 = [];
                var countries2 = [];
                var year1 = [];
                var year2 = [];
                
                var goles = [];
                
                var res = [];
                var res2 = [];
                countries1 = response.data.map(function(d) { return d.country });
                countries2 = response1.data.map(function(d) { return d.country });
               var aux = response.data.map(function(d) { return d.rankingPosition });
                year2 = response1.data.map(function(d) { return d.year });
                goles = response1.data.map(function(d) { return d.scorergoal });
                var res = [];
                var res2=[];
                var i =0;
                while(i<goles.length){
                    res.push(goles[i]);
                    res2.push(aux[i]);
                    i++;
                }
                  var ctx = document.getElementById('myChart');
var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'radar', //radar
    data: {
        labels: ["Top1","Top2","Top3","Top4","Top5","Top6"],
        datasets: [{
            label: 'goles por jugador',
            data: res,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        },{
            label: 'gasto por habitante',
            data: res2,
            backgroundColor: [
                'rgba(55, 199, 32, 0.2)',
                'rgba(21, 62, 35, 0.2)',
                'rgba(25, 26, 186, 0.2)',
                'rgba(752, 12, 92, 0.2)',
                'rgba(13, 102, 155, 0.2)',
                'rgba(25, 15, 164, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
                
            });
            });
    }

}]);