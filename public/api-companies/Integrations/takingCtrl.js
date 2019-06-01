/* global angular */

var app = angular.module("AppManager");

app.controller("takingCtrl", ["$scope", "$http", function($scope, $http) {


    console.log("List takings Controller initialized.");

    var api1 = "proxyDio/api/v1/takingStats";
    var datoAux = [];
    var datoAux2 = [];
    var datoAux3 = [];
    var x=[];
    refresh();

    function refresh() {

        console.log("Requesting to <" + api1 + ">...");
        $http
            .get(api1)
            .then(function(response) {
                console.log("Data received:" + JSON.stringify(response.data, null, 2));

            });




        $http.get(api1).then(function(responseApi1) {
            var i;
            
            for (i = 0; i < responseApi1.data.length; i++) {
                datoAux.push(responseApi1.data[i].year);
                datoAux2.push(responseApi1.data[i].employee);
            }
            console.log("Data received de DIONI:" + JSON.stringify(responseApi1.data, null, 2));
            $scope.takingstats = responseApi1.data;
            for (var i = 0; i < responseApi1.data.length; i++) {
                datoAux[i];
            }

            //HIGHCHART


            Highcharts.chart('container', {
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'World\'s largest cities per 2017'
                },
                subtitle: {
                    text: 'Source: <a href="http://en.wikipedia.org/wiki/List_of_cities_proper_by_population">Wikipedia</a>'
                },
                xAxis: {
                    type: 'category',
                    labels: {
                        rotation: -45,
                        style: {
                            fontSize: '13px',
                            fontFamily: 'Verdana, sans-serif'
                        }
                    }
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Population (millions)'
                    }
                },
                legend: {
                    enabled: false
                },
                tooltip: {
                    pointFormat: 'Population in 2017: <b>{point.y:.1f} millions</b>'
                },
                series: [{
                    name: 'Population',
                    data: [
                        [datoAux[0], datoAux2[0]],

                    ],
                    dataLabels: {
                        enabled: true,
                        rotation: -90,
                        color: '#FFFFFF',
                        align: 'right',
                        format: '{point.y:.1f}', // one decimal
                        y: 10, // 10 pixels down from the top
                        style: {
                            fontSize: '13px',
                            fontFamily: 'Verdana, sans-serif'
                        }
                    }
                }]
            });



        });




    }
}]);
