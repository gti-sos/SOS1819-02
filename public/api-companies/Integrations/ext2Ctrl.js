/* global angular Highcharts */

angular
    .module("AppManager")
    .controller("ext2Ctrl", ["$scope", "$http", function($scope, $http) { //$scope permite acceder a los datos, al modelo.
        //$http establece la conexión entre el navegador del usuario y el servidor (backend).

        console.log("Integration Grupal Controller initialized");

        var apiPablo = "https://sos1819-02.herokuapp.com/api/v1/companies-stats";
        var apiext = "https://api.tvmaze.com/search/people?q=lauren";

        // Highcharts, integración externa
        $http.get(apiPablo).then(function(response1) {
            $http.get(apiext).then(function(response2) {

                Highcharts.chart('containerExt', {

                    chart: {
                        type: 'line',
                        plotBorderWidth: 1,
                        zoomType: 'xy'
                    },

                    legend: {
                        enabled: false
                    },

                    title: {
                        text: 'Integración Externa'
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
                            color: 'yellow',
                            dashStyle: 'dot',
                            width: 2,
                            value: 65,
                            label: {
                                rotation: 0,
                                y: 15,
                                style: {
                                    fontStyle: 'italic'
                                },
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
                            color: 'yellow',
                            dashStyle: 'yellow',
                            width: 2,
                            value: 50,
                            label: {
                                align: 'right',
                                style: {
                                    fontStyle: 'italic'
                                },

                            },
                            zIndex: 3
                        }]
                    },

                    tooltip: {
                        useHTML: true,
                        headerFormat: '<table>',
                        pointFormat: '<tr><th colspan="2"><h3>{point.comany}</h3></th></tr>' +
                            '<tr><th>income:</th><td>{point.x}</td></tr>' +
                            '<tr><th>score:</th><td>{point.y}</td></tr>' +
                            '<tr><th></th><td>{point.z}</td></tr>',
                        footerFormat: '</table>',
                        followPointer: true
                    },

                    plotOptions: {
                        series: {
                            dataLabels: {
                                enabled: true,
                                format: '{point.company}'
                            }
                        }
                    },

                    series: [{
                        data: [
                            { x: response1.data[0].income, y: response2.data[0].score, company: response1.data[0].company },
                            { x: response1.data[1].income, y: response2.data[1].score, company: response1.data[1].company },
                            { x: response1.data[2].income, y: response2.data[2].score, company: response1.data[2].company },
                            { x: response1.data[3].income, y: response2.data[3].score, company: response1.data[3].company },
                            { x: response1.data[4].income, y: response2.data[4].score, company: response1.data[4].company },

                        ]
                    }]
                });
            });
        });



    }]);
