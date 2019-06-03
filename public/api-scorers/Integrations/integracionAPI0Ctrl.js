/* global angular */

var app = angular.module("AppManager");

app.controller("aCtrl", ["$scope", "$http", function($scope, $http) {


    console.log("Controller initialized.");

    var API = "proxySR/api/v1/suicide-rates";
    refresh();

    function refresh() {

        console.log("Requesting to <" + API + ">...");
        $http
            .get(API)
            .then(function(response) {

                console.log("Data received:" + JSON.stringify(response.data, null, 2));


              var myConfig = {
  "type":"venn",
  "title":{
    "text": "Facts About AngularJS"
  },
  "tooltip":{
    "text": "%t",
    "border-radius": 5,
    "font-size": 15
  },
  "series":[
    {
      "values":[400],
      "join":[15],
      "text": "Popularity Of AngularJS Online",
      "background-color":'#006ACC',
      "tooltip":{
        "background-color":'#006ACC',
      }
    },
    {
      "values":[300],
      "join":[15],
      "text": "People Who Use AngularJS",
      "background-color":'#FBB148',
      "tooltip":{
        "background-color":'#FBB148',
      }
    },
    {
      "values":[100],
      "join":[15],
      "text": "People Who Actually Know How To Use AngularJS",
      "background-color":'#DD0031',
      "tooltip":{
        "background-color":'#DD0031',
      }
    }
  ]
};
 
zingchart.render({ 
	id : 'myChart', 
	data : myConfig, 
	height: '100%', 
	width: "100%" 
});


                
                
            });
    
    }
    

}]);