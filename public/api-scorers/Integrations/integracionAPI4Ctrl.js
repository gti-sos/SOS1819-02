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
                
                 new Morris.Line({
  // ID of the element in which to draw the chart.
  element: 'myfirstchart',
  // Chart data records -- each entry in this array corresponds to a point on
  // the chart.
  data: [
    { year: '2008', value: 20 },
    { year: '2009', value: 10 },
    { year: '2010', value: 5 },
    { year: '2011', value: 5 },
    { year: '2012', value: 20 }
  ],
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