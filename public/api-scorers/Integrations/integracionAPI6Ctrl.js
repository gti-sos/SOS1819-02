/* global angular */

var app = angular.module("AppManager");

app.controller("pruebaCtrl", ["$scope", "$http", function($scope, $http) {


    console.log("Controller initialized.");

    var API = "https://sos1819-12.herokuapp.com/api/v1/youth-unemployment-stats";
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

                $scope.unemployments= response.data;
                var aux = response.data.map(function(d) { return d.youth_unemployment });
                var aux2 = response1.data.map(function(d) { return d.scorergoal });
                var res= [];
                var i =0;
                var j=10;
                while(i<6){
                    res.push({ x: j, y: aux2[i], indexLabel: "goles marcados"  },
		        	{ x: j, y: aux[i],indexLabel: "desempleo juvenil" });
                    j=j+10;
                    i++;
                }
                
                
                          var chart = new CanvasJS.Chart("chartContainer", {
	animationEnabled: true,
	exportEnabled: true,
	theme: "light1", // "light1", "light2", "dark1", "dark2"
	title:{
		text: "CanvasJS:column"
	},
	data: [{
		type: "column", //change type to bar, line, area, pie, etc
		//indexLabel: "{y}", //Shows y value on all Data Points
		indexLabelFontColor: "#5A5757",
		indexLabelPlacement: "outside",
		dataPoints: 
			res
		
	}]
});
chart.render();
            });
            });
    }

}]);