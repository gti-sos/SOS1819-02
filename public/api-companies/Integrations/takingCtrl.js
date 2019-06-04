/* global angular */

var app = angular.module("AppManager");

app.controller("takingCtrl", ["$scope", "$http", function($scope, $http) {


    console.log("List takings Controller initialized.");
    var myApi = "https://sos1819-02.herokuapp.com/api/v1/companies-stats";

    var api1 = "proxyDio/api/v1/takingStats";
    var datoAux = [];
    var datoAux2 = [];
    var datoAux3 = [];
    var x = [];
    refresh();

    function refresh() {



        ///////////////////////WIDGET///////////////////////////


        $http.get(api1).then(function(responseApi1) {
            $http.get(myApi).then(function(responseApi2) {
                
                console.log("Data received de DIONI:" + JSON.stringify(responseApi1.data, null, 2));
                $scope.takingstats = responseApi1.data;
                var incomes= [];
                var films = responseApi1.data.map(function(d) { return d.film });
                var i=0;
                while(i<films.length){
                    incomes.push(responseApi2.data[i].income);
                    i++;
                }




                //HIGHCHART



                var chart = Highcharts.chart('containerDio', {

                    title: {
                        text: 'Taking && Companies'
                    },

                    subtitle: {
                        text: ''
                    },

                    xAxis: {
                        categories: films
                    },

                    series: [{
                        type: 'column',
                        colorByPoint: true,
                        data: incomes,
                        showInLegend: false
                    }]

                });


                $('#plain').click(function() {
                    chart.update({
                        chart: {
                            inverted: false,
                            polar: false
                        },
                        subtitle: {
                            text: 'Barras'
                        }
                    });
                });

                $('#inverted').click(function() {
                    chart.update({
                        chart: {
                            inverted: true,
                            polar: false
                        },
                        subtitle: {
                            text: 'Inverted'
                        }
                    });
                });

                $('#polar').click(function() {
                    chart.update({
                        chart: {
                            inverted: false,
                            polar: true
                        },
                        subtitle: {
                            text: 'Polar'
                        }
                    });
                });



            });


        });
    }




}]);
