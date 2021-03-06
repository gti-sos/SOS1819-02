/*global angular*/
/*global AmCharts*/

angular.module("AppManager")
    .controller("ext1Ctrl", ["$scope", "$http",
        function($scope, $http) {
            console.log("List Ctrl initialized!");
            var apiPropia = "/api/v1/companies-stats";
            var api = "https://api.discogs.com/artists/1/releases";


            $http.get(api).then(function(response1) {
                $http.get(apiPropia).then(function(response2) {

                    var countries = response2.data.map(function(d) { return d.country });
                    var years = response2.data.map(function(d) { return d.year });
                    var incomes = response2.data.map(function(d) { return d.income });





                    var ultimoAux = [];
                    for (var i = 0; i < response2.data.length; i++) {
                        ultimoAux.push({
                            "y": getRandomArbitrary(5, 100),
                            "x": incomes[i],
                            "value": response1.data.releases[i].title,
                            "income": incomes[i],
                            "countries": countries[i],
                            "y2": getRandomArbitrary(5, 100),
                            "x2": getRandomArbitrary(5, 100),
                            "value2": response2.data[i].format
                        });
                    }

                    console.log(ultimoAux);

                    var chart = AmCharts.makeChart("chartdiv", {
                        "type": "xy",
                        "theme": "light",
                        "balloon": {
                            "fixedPosition": true,
                        },
                        "dataProvider": ultimoAux,
                        "valueAxes": [{
                            "position": "bottom",
                            "axisAlpha": 0
                        }, {
                            "minMaxMultiplier": 1.2,
                            "axisAlpha": 0,
                            "position": "left"
                        }],
                        "startDuration": 1.5,
                        "graphs": [{
                            "balloonText": "Title:<b>[[value]]</b> Country:<b>[[countries]]</b><br>Income:<b>[[income]]</b>",
                            "bullet": "circle",
                            "bulletBorderAlpha": 0.2,
                            "bulletAlpha": 0.8,
                            "lineAlpha": 0,
                            "fillAlphas": 0,
                            "valueField": "value",
                            "xField": "x",
                            "yField": "y",
                            "maxBulletSize": 100
                        }, {
                            "balloonText": "Title:<b>[[value]]</b> Country:<b>[[countries]]</b><br>Income:<b>[[income]]</b>",
                            "bullet": "diamond",
                            "bulletBorderAlpha": 0.2,
                            "bulletAlpha": 0.8,
                            "lineAlpha": 0,
                            "fillAlphas": 0,
                            "valueField": "value2",
                            "xField": "x2",
                            "yField": "y2",
                            "maxBulletSize": 100
                        }],
                        "marginLeft": 46,
                        "marginBottom": 35,
                        "export": {
                            "enabled": true
                        }
                    });


                    function getRandomArbitrary(min, max) {
                        var random = Math.random() * (max - min) + min;
                        return Math.round(random);

                    }

                });

            });
        }
    ]);
