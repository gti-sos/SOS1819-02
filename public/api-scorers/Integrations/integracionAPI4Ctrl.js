/* global angular */

var app = angular.module("AppManager");

app.controller("peliculasCtrl", ["$scope", "$http", function($scope, $http) {


    console.log("Controller initialized.");

    var API = "https://sos1819-02.herokuapp.com/api/v1/movies-stats";
   var API2 = "/api/v1/scorers-stats";
    refresh();

    function refresh() {

        console.log("Requesting to <" + API + ">...");
        $http
            .get(API)
            .then(function(response) {
                console.log("Requesting to <" + API + ">...");
        $http
            .get(API2)
            .then(function(response1) {

                console.log("Data received:" + JSON.stringify(response.data, null, 2));
                var countries1 = [];
                var countries2 = [];
                
                countries1 = response.data.map(function(d) { return d.country });
                countries2 = response1.data.map(function(d) { return d.country });
                var edition = response.data.map(function(d) { return d.movieedition });
                var goles = response1.data.map(function(d) { return d.scorergoal });
                var res = []
                for (var i=0; i< goles.length;i++){
                res.push({ year: "200"+i, value: edition[i] },{ year: "200"+i, value: goles[i] });
                 }
                 new Morris.Line({
  // ID of the element in which to draw the chart.
  element: 'myfirstchart',
  // Chart data records -- each entry in this array corresponds to a point on
  // the chart.
  data: res,
  
  // The name of the data record attribute that contains x-values.
  xkey: 'year',
  // A list of names of data record attributes that contain y-values.
  ykeys: ['value'],
  // Labels for the ykeys -- will be displayed when you hover over the
  // chart.
  labels: ['Value']
});

            }); 
            });
    }

}]);