angular
    .module("AppManager")
    .controller("happinessCtrl", ["$scope", "$http", function($scope, $http) { //$scope permite acceder a los datos, al modelo.
        //$http establece la conexión entre el navegador del usuario y el servidor (backend).

        console.log("Happiness Controller initialized");

        var apiHappy =  "proxyHS/api/v1/happiness-stats";
        var apiMovies = "https://sos1819-02.herokuapp.com/api/v1/movies-stats";


        $http.get(apiHappy).then(function(response1) {
                $http.get(apiMovies).then(function(response2) {
                   

                   
           console.log("Data Happiness Stats received:" + JSON.stringify(response1.data, null, 2));
            console.log("Data Movies received:" + JSON.stringify(response2.data, null, 2));


var aux = []

var res1 = response1.data

var res2 = response2.data

for (var i=0; i< res2.length;i++){
     aux.push({
            "label": res2[i].name ,
            "value":res1[i].happinessScore
            });
   }



console.log("aux :"+ aux);



            /////MORRIS CHARTS DONUT/////////////77
            
  new  Morris.Donut({
     element: 'donut',
     data:aux
    });
                    
                    
            });
                   
                   
                });

       


    }]);




   
