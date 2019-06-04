angular
    .module("AppManager")
    .controller("gpeCtrl", ["$scope", "$http", function($scope, $http) { //$scope permite acceder a los datos, al modelo.
        //$http establece la conexión entre el navegador del usuario y el servidor (backend).

        console.log("General public expenses Controller initialized");

        var apiGPE =  "proxyGPE/api/v1/general-public-expenses/";
        var apiMovies = "https://sos1819-02.herokuapp.com/api/v1/movies-stats";


        $http.get(apiGPE).then(function(response1) {
                $http.get(apiMovies).then(function(response2) {
                   

                   
           console.log("Data GPE  received:" + JSON.stringify(response1.data, null, 2));
            console.log("Data Movies received:" + JSON.stringify(response2.data, null, 2));


var aux = []

var res1 = response1.data

var res2 = response2.data

for (var i=0; i< res2.length;i++){
     aux.push(  {x: res2.year, y: res1.publicSpendingPib} );
   }



console.log("aux :"+ aux);

                
var container = document.getElementById('visualization');
  var items = [
    {x: res2[1].year, y:  res1[0].publicSpendingPib},
    {x: res2[1].year, y:  res1[1].publicSpendingPib},
    {x: res2[2].year, y:  res1[2].publicSpendingPib},
    {x: res2[3].year, y:  res1[3].publicSpendingPib},
    {x: res2[4].year, y:  res1[4].publicSpendingPib},
    {x: res2[5].year, y:  res1[5].publicSpendingPib},
    {x: res2[6].year, y:  res1[6].publicSpendingPib}
  ];

  var dataset = new vis.DataSet(items);
  var options = {};
  var graph2d = new vis.Graph2d(container, dataset, options);
                
             
                });
                   
                   
                });

       


    }]);
            
           