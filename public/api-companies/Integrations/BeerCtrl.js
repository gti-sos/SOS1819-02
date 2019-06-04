/* global angular */

var app = angular.module("AppManager");

app.controller("BeerCtrl", ["$scope", "$http", function($scope, $http) {


    console.log("List Beer Controller initialized.");
    var myApi = "https://sos1819-02.herokuapp.com/api/v1/companies-stats";
    var aux = "proxyJP/api/v1/beer-consumed-stats";
    refresh();

    function refresh() {

        console.log("Requesting to <" + aux + ">...");
        $http
            .get(aux)
            .then(function(response) {
                console.log("Data received:" + JSON.stringify(response.data, null, 2));

                $scope.beer_consumeds = response.data;
                console.log("$scope.beer_consumeds");
            });
    }
    $http.get(aux).then(function(responseApi1) {
        $http.get(myApi).then(function(responseApi2) {

            console.log("Data received de DIONI:" + JSON.stringify(responseApi1.data, null, 2));
            $scope.takingstats = responseApi1.data;
            var incomes = [];
            var countries = responseApi1.data.map(function(d) { return d.country });
            var i = 0;
            while (i < countries.length) {
                incomes.push(responseApi2.data[i].income);
                i++;
            }

            Highcharts.chart('container', {
                chart: {
                    type: 'line'
                },
                title: {
                    text: 'Beer Consumed && Companies'
                },
                subtitle: {
                    text: ''
                },
                xAxis: {
                    categories: countries
                },
                yAxis: {
                    title: {
                        text: 'Income'
                    }
                },
                plotOptions: {
                    line: {
                        dataLabels: {
                            enabled: true
                        },
                        enableMouseTracking: false
                    }
                },
                series: [{
                    name: "Países" ,
                    
                    data: incomes
                }]
            });
        });
    });
}]);
