/* global angular */

var app = angular.module("AppManager");

app.controller("uefaJaCtrl", ["$scope", "$http", function($scope, $http) {


    console.log("List Uefa club rankings Controller initialized.");

    var apiPropia = "/api/v1/companies-stats";
    var api = "https://sos1819-06.herokuapp.com/api/v1/uefa-club-rankings/";
    refresh();

    function refresh() {

        console.log("Requesting  to <" + api + ">...");
        $http
            .get(api)
            .then(function(response1) {

                console.log("Data received:" + JSON.stringify(response1.data, null, 2));

                $scope.uefaclubrankings = response1.data;
            });
    }




    $http.get(api).then(function(response1) {
        $http.get(apiPropia).then(function(response2) {
            var countries = [];
            var years = [];
            var incomes = [];

            var data = [];



            var points = response1.data.map(function(d) { return d.points });
            countries = response2.data.map(function(d) { return d.country });
            years = response2.data.map(function(d) { return d.year });
            incomes = response2.data.map(function(d) { return d.income });


            var chardata2 = response2.data.map(function(company) {
                newValue = company.company;
                newValue2 = company.income;

                return [newValue, newValue2];

            });


            //GEOCHART

            google.charts.load('current', {

                'packages': ['geochart'],
                // Note: you will need to get a mapsApiKey for your project.
                // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
                'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
            });
            google.charts.setOnLoadCallback(drawRegionsMap);


            function drawRegionsMap() {
                var aux = [];
                aux.push(["Country", "Puntos"]);
                aux.push([countries[7], points[7]]);
                aux.push([countries[4], points[4]]);

                console.log(aux);
                var plot = google.visualization.arrayToDataTable(aux);

                var options = {};

                var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

                chart.draw(plot, options);



            }
        });



    });

    ;

}]);
