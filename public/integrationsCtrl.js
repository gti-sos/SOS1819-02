/* global angular Highcharts */

angular
    .module("AppManager")
    .controller("integrationsCtrl", ["$scope", "$http", function($scope, $http) { //$scope permite acceder a los datos, al modelo.
        //$http establece la conexión entre el navegador del usuario y el servidor (backend).

        console.log("Integration Grupal Controller initialized");

        var apiPablo = "https://sos1819-02.herokuapp.com/api/v1/companies-stats";
        var apiAlberto = "https://sos1819-02.herokuapp.com/api/v1/scorers-stats";
        var apiAle = "https://sos1819-02.herokuapp.com/api/v1/movies-stats";

        // Highcharts, integración grupal

        $http.get(apiPablo).then(function(response1) {
            $http.get(apiAlberto).then(function(response2) {
                $http.get(apiAle).then(function(response3) {
                    Highcharts.chart('container_grupal', {

                        chart: {
                            type: 'area',
                            plotBorderWidth: 1,
                            zoomType: 'xy'
                        },

                        legend: {
                            enabled: false
                        },

                        title: {
                            text: 'Integración Grupal'
                        },

                        xAxis: {
                            gridLineWidth: 1,
                            title: {
                                text: 'income'
                            },
                            labels: {
                                format: '{value}'
                            },
                            plotLines: [{
                                color: 'black',
                                dashStyle: 'dot',
                                width: 2,
                                value: 65,
                                label: {
                                    rotation: 0,
                                    y: 15,
                                    style: {
                                        fontStyle: 'italic'
                                    },
                                    text: 'Safe fat intake 65g/day'
                                },
                                zIndex: 3
                            }]
                        },

                        yAxis: {
                            startOnTick: false,
                            endOnTick: false,
                            title: {
                                text: 'movieedition'
                            },
                            labels: {
                                format: '{value}'
                            },
                            maxPadding: 0.2,
                            plotLines: [{
                                color: 'black',
                                dashStyle: 'dot',
                                width: 2,
                                value: 50,
                                label: {
                                    align: 'right',
                                    style: {
                                        fontStyle: 'italic'
                                    },
                                    text: 'Safe sugar intake 50g/day',
                                    x: -10
                                },
                                zIndex: 3
                            }]
                        },

                        tooltip: {
                            useHTML: true,
                            headerFormat: '<table>',
                            pointFormat: '<tr><th colspan="2"><h3>{point.name}</h3></th></tr>' +
                                '<tr><th>income:</th><td>{point.x}</td></tr>' +
                                '<tr><th>movieedition:</th><td>{point.y}</td></tr>' +
                                '<tr><th>scoreraverage:</th><td>{point.z}%</td></tr>',
                            footerFormat: '</table>',
                            followPointer: true
                        },

                        plotOptions: {
                            series: {
                                dataLabels: {
                                    enabled: true,
                                    format: '{point.name}'
                                }
                            }
                        },

                        series: [{
                            data: [
                                { x: response1.data[0].income, y: response3.data[0].movieedition, z: response2.data[0].scoreraverage, name: response1.data[0].company, name: response1.data[0].name },
                                { x: response1.data[1].income, y: response3.data[1].movieedition, z: response2.data[1].scoreraverage, name: response1.data[1].company, name: response1.data[1].name },
                                { x: response1.data[2].income, y: response3.data[2].movieedition, z: response2.data[2].scoreraverage, name: response1.data[2].company, name: response1.data[2].name },
                                { x: response1.data[3].income, y: response3.data[3].movieedition, z: response2.data[3].scoreraverage, name: response1.data[3].company, name: response1.data[3].name },
                                { x: response1.data[4].income, y: response3.data[4].movieedition, z: response2.data[4].scoreraverage, name: response1.data[4].company, name: response1.data[4].name }
                            ]
                        }]
                    });
                });
            });
        });


    }]);