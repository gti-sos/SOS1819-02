/* global angular */

var app = angular.module("AppManager");

app.controller("scorerCtrl", ["$scope", "$http", function($scope, $http) {


    console.log("List  Controller initialized.");


    var apiPablo = "https://sos1819-02.herokuapp.com/api/v1/companies-stats";
    var apiext = "https://sos1819-02.herokuapp.com/api/v1/scorers-stats/";;


    $http.get(apiPablo).then(function(response1) {
        $http.get(apiext).then(function(response2) {

            var i = 0;

            var aux = response2.data.map(function(d) { return d.name });

            var years = response1.data.map(function(d) { return d.year });
            var incomes = response1.data.map(function(d) { return d.income });
            var incomes2 = []
            var names = []
            var res = [];
            while (i < aux.length) {
                res.push(aux[i]);
                incomes2.push(incomes[i]);
                i++;
            }
            console.log("Data received:" + JSON.stringify(aux, null, 2));
            console.log("Data received:" + JSON.stringify(incomes2, null, 2));

            var chardata2 = response1.data.map(function(company) {
                newValue = company.company;
                newValue2 = company.income;

                return [newValue, newValue2];

            });

            var ctx = document.getElementById('myChart').getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: res ,
                    datasets: [{
                        label: '# Income',
                        data: incomes2,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                            'rgba(155, 106, 86, 0.2)',
                            'rgba(15, 192, 192, 0.2)',
                            'rgba(153, 102, 155, 0.2)',
                            'rgba(155, 159, 14, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)',
                            'rgba(140, 106, 86, 1)',
                            'rgba(15, 192, 192, 1)',
                            'rgba(100, 102, 1255, 1)',
                            'rgba(1, 159, 14, 1)'
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


        })
    });

}]);
