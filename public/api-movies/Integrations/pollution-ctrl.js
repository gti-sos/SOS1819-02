angular
    .module("AppManager")
    .controller("pollutionCtrl", ["$scope", "$http", function($scope, $http) { //$scope permite acceder a los datos, al modelo.
        //$http establece la conexión entre el navegador del usuario y el servidor (backend).

        console.log("Pollution Controller initialized");

        var apiPollution=  "/proxyP/api/v1/pollution-stats";
        var apiMovies = "https://sos1819-02.herokuapp.com/api/v1/movies-stats";


        $http.get(apiPollution).then(function(response1) {
                $http.get(apiMovies).then(function(response2) {
                   

                   
           console.log("Data Pollution Stats received:" + JSON.stringify(response1.data, null, 2));
            console.log("Data Movies received:" + JSON.stringify(response2.data, null, 2));


var aux = []

var res1 = response1.data

var res2 = response2.data

for (var i=0; i< res2.length;i++){
     aux.push(  res1.year, res2.movienomination,res2.movieaward);
   }



console.log("aux :"+ aux);
                
                
              new  Morris.Bar({
  element: 'barras',
  data: [
    { y: res1[0].country, a: res1[0].pollution_perca, b: res2[0].movieaward },
    { y: res1[1].country, a: res1[1].pollution_perca, b: res2[2].movieaward },
    { y: res1[2].country, a: res1[1].pollution_perca, b: res2[2].movieaward },
    { y: res1[3].country, a: res1[3].pollution_perca, b: res2[3].movieaward },
    { y: res1[4].country, a: res1[4].pollution_perca, b: res2[4].movieaward },
  ],
  xkey: 'y',
  ykeys: ['a', 'b'],
  labels: ['Emisiones de CO2 toneladas per capita', 'Premios Oscar']
});
                });
                   
                   
                });

       


    }]);