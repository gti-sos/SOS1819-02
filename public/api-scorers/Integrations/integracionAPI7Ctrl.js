/* global angular */

var app = angular.module("AppManager");

app.controller("climateCtrl", ["$scope", "$http", function($scope, $http) {


    console.log("Controller initialized.");

    var API = "https://sos1819-09.herokuapp.com/api/v2/climate-stats";
    var API2 = "/api/v1/scorers-stats";
    refresh();

    function refresh() {

        console.log("Requesting to <" + API + ">...");
        $http
            .get(API)
            .then(function(response) {
        $http
            .get(API2)
            .then(function(response1) {

                console.log("Data received:" + JSON.stringify(response.data, null, 2));

                $scope.climates= response.data;
                var year1 = response.data.map(function(d) { return d.year });
                var co2 = response.data.map(function(d) { return d.co2_stats });
                var year2 = response1.data.map(function(d) { return d.year });
                var goles = response.data.map(function(d) { return d.scorergoal });
                var res = []
                var res2 = []
                var i =0;
                var j=0;
                while(i<year1.length){
                    res.push({ x: new Date(year1[i]), y: co2[i] });
                    i++;
                }
                while(j<year2.length){
                    res2.push({ x: new Date(year2[j]), y: co2[j] });
                    j++;
                }
                
                        var chart = new CanvasJS.Chart("chartContainer", {
	animationEnabled: true,
	title:{
		text: "CanvasJS lineal"
	},
	axisX: {
		valueFormatString: "DD MMM,YY"
	},
	axisY: {
		title: "Cantidad",
		includeZero: false,
		suffix: " "
	},
	legend:{
		cursor: "pointer",
		fontSize: 16,
		itemclick: toggleDataSeries
	},
	toolTip:{
		shared: true
	},
	data: [{
		name: "años climate",
		type: "spline",
		yValueFormatString: "el maximo es :#0.## °C",
		showInLegend: true,
		dataPoints: res
	},
	{
		name: "años scorers",
		type: "spline",
		yValueFormatString: "#0.## °C",
		showInLegend: true,
		dataPoints: res2
	}]
});
chart.render();

function toggleDataSeries(e){
	if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
		e.dataSeries.visible = false;
	}
	else{
		e.dataSeries.visible = true;
	}
	chart.render();
}
                
            });
            });
    }

}]);