/* global angular */

var app = angular.module("AppManager");

app.controller("muertoCtrl", ["$scope", "$http", function($scope, $http) {


    console.log("List  Controller initialized.");
 var API2 = "/api/v1/companies-stats";
    var API = "https://sos1819-14.herokuapp.com/api/v1/deceaseds/";
    refresh();

    function refresh() {

        console.log("Requesting  to <" + API + ">...");
        $http
            .get(API)
            .then(function(response) {

                console.log("Data received:" + JSON.stringify(response.data, null, 2));

                $scope.deceaseds = response.data;
            });
    }
    console.log("Requesting to <" + API + ">...");
    $http
        .get(API)
        .then(function(response) {
            console.log("Requesting to <" + API + ">...");
            $http
                .get(API2)
                .then(function(response1) {

                    console.log("Data received:" + JSON.stringify(response.data, null, 2));


                    var aux = response.data.map(function(d) { return d.life });
                    var aux2 = response1.data.map(function(d) { return d.income });
                    var res = [];
                    var i = 0;
                    var j = 10;
                    while (i < 6) {
                        res.push({ x: j, y: aux2[i], indexLabel: "income" }, { x: j, y: aux[i], indexLabel: "life" });
                        j = j + 10;
                        i++;
                    }


                    var chart = new CanvasJS.Chart("chartContainer", {
                        animationEnabled: true,
                        exportEnabled: true,
                        theme: "light1", // "light1", "light2", "dark1", "dark2"
                        title: {
                            text: "CanvasJS:doughnut"
                        },
                        data: [{
                            type: "doughnut", //change type to bar, line, area, pie, etc
                            //indexLabel: "{y}", //Shows y value on all Data Points
                            indexLabelFontColor: "#5A5757",
                            indexLabelPlacement: "outside",
                            dataPoints: res

                        }]
                    });
                    chart.render();
                });
        });
}]);
