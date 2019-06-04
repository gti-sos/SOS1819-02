angular
    .module("AppManager")
    .controller("elementsCtrl", ["$scope", "$http", function($scope, $http) { //$scope permite acceder a los datos, al modelo.
        //$http establece la conexión entre el navegador del usuario y el servidor (backend).

        console.log("Elements Stats Controller initialized");

        var apiElements =  "https://sos1819-14.herokuapp.com/api/v1/elements";
        var apiMovies = "https://sos1819-02.herokuapp.com/api/v1/movies-stats";


        $http.get(apiElements).then(function(response1) {
                $http.get(apiMovies).then(function(response2) {
                   

                   
           console.log("Data Elements  received:" + JSON.stringify(response1.data, null, 2));
            console.log("Data Movies received:" + JSON.stringify(response2.data, null, 2));


var aux = []

var res1 = response1.data

var res2 = response2.data

for (var i=0; i< res2.length;i++){
     aux.push(  	{ y: res2.movieedition, label: res1.province } );
   }



console.log("aux :"+ aux);

               ///////////////CANVAS.JS////////////////// 

var chart = new CanvasJS.Chart("chartContainer", {
	animationEnabled: true,
	title:{
		text: "Email Categories",
		horizontalAlign: "left"
	},
	data: [{
		type: "doughnut",
		startAngle: 60,
		//innerRadius: 60,
		indexLabelFontSize: 17,
		indexLabel: "{label} - #percent%",
		toolTipContent: "<b>{label}:</b> {y} (#percent%)",
		dataPoints: [
			{ y: res2[0].movieedition, label: res1[0].province },
			{ y: res2[1].movieedition, label: res1[1].province },
			{ y: res2[2].movieedition, label: res1[2].province },
			{ y: res2[3].movieedition, label: res1[3].province },
			{ y: res2[4].movieedition, label: res1[4].province },
			{ y: res2[5].movieedition, label: res1[5].province },
		]
	}]
});
chart.render();



                
             
                });
                   
                   
                });

     

    }]);
            
           

