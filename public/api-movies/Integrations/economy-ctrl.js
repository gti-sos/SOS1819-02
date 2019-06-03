/* global angular */

var app = angular.module("AppManager");

app.controller("economyCtrl", ["$scope", "$http", function($scope, $http) {


    console.log("List Economy Stats Controller initialized.");

    
        var apiEconomy = "/proxyE/api/v1/economy-stats";
        var apiMovies = "https://sos1819-02.herokuapp.com/api/v1/movies-stats";


        $http.get(apiEconomy).then(function(response1) {
                $http.get(apiMovies).then(function(response2) {
                   

                   
           console.log("Data Economy received:" + JSON.stringify(response1.data, null, 2));
            console.log("Data Movies received:" + JSON.stringify(response2.data, null, 2));


var aux1 = []
var aux2 = []


var res1 = response1.data

var res2 = response2.data

for (var i=0; i< res2.length;i++){
     aux1.push(res1[i].country);
   }
   for (var i=0; i< res2.length;i++){
     aux2.push(res2[i].movieedition);
   }




//console.log("aux :"+ aux);


                   
///////////////////////////////////   Charts      ///////////////////////////////


     
var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'polarArea',
    data: {
        labels: aux1,
        datasets: [{
            label: '# Income',
            data: aux2,
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
            borderWidth: 2
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


    }]);

