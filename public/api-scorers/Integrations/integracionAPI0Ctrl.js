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
    const dataSource = {
  chart: {
    theme: "fusion",
    caption: "Sales & Profit Analysis",
    subcaption: "For Last Quarter",
    xaxisminvalue: "0",
    xaxismaxvalue: "100",
    yaxisminvalue: "0",
    yaxismaxvalue: "30000",
    xaxisname: "Average Price",
    yaxisname: "Units Sold",
    plottooltext: "$name : Profit Contribution: $zvalue%",
    drawquadrant: "1",
    quadrantlabeltl: "Low Price / High Sales",
    quadrantlabeltr: "High Price / High Sales",
    quadrantlabelbl: "Low Price / Low Sales",
    quadrantlabelbr: "High Price / Low Sales",
    quadrantxval: "54",
    quadrantyval: "12000",
    quadrantlinealpha: "50",
    quadrantlinethickness: "2"
  },
  categories: [
    {
      category: [
        {
          label: "0",
          x: "0"
        },
        {
          label: "$20",
          x: "20",
          showverticalline: "1"
        },
        {
          label: "$40",
          x: "40",
          showverticalline: "1"
        },
        {
          label: "$60",
          x: "60",
          showverticalline: "1"
        },
        {
          label: "$80",
          x: "80",
          showverticalline: "1"
        },
        {
          label: "$100",
          x: "100",
          showverticalline: "1"
        }
      ]
    }
  ],
  dataset: [
    {
      data: [
        {
          x: "80",
          y: "15000",
          z: "24",
          name: "Nike"
        },
        {
          x: "60",
          y: "18500",
          z: "26",
          name: "Adidas"
        },
        {
          x: "50",
          y: "19450",
          z: "19",
          name: "Puma"
        },
        {
          x: "65",
          y: "10500",
          z: "8",
          name: "Fila"
        },
        {
          x: "43",
          y: "8750",
          z: "5",
          name: "Lotto"
        },
        {
          x: "32",
          y: "22000",
          z: "10",
          name: "Reebok"
        },
        {
          x: "44",
          y: "13000",
          z: "9",
          name: "Woodland"
        }
      ]
    }
  ],
  trendlines: [
    {
      line: [
        {
          startvalue: "20000",
          endvalue: "30000",
          istrendzone: "1",
          color: "#aaaaaa",
          alpha: "14"
        },
        {
          startvalue: "10000",
          endvalue: "20000",
          istrendzone: "1",
          color: "#aaaaaa",
          alpha: "7"
        }
      ]
    }
  ]
};

FusionCharts.ready(function() {
  var myChart = new FusionCharts({
    type: "bubble",
    renderAt: "chart-container",
    width: "100%",
    height: "100%",
    dataFormat: "json",
    dataSource
  }).render();
});


//               const dataSource = {
//   chart: {
//     caption: "Top 5 countries with Global Oil Reserves",
//     subcaption: "MMbbl= One Million barrels",
//     enablesmartlabels: "1",
//     showlabels: "1",
//     numbersuffix: " MMbbl",
//     usedataplotcolorforlabels: "1",
//     plottooltext: "$label, <b>$value</b> MMbbl",
//     theme: "fusion"
//   },
//   data: [
//     {
//       label: "Venezuela",
//       value: "290"
//     },
//     {
//       label: "Saudi",
//       value: "260"
//     },
//     {
//       label: "Canada",
//       value: "180"
//     },
//     {
//       label: "Iran",
//       value: "140"
//     },
//     {
//       label: "Russia",
//       value: "115"
//     }
//   ]
// };

// FusionCharts.ready(function() {
//   var myChart = new FusionCharts({
//     type: "doughnut3d",
//     renderAt: "chart-container",
//     width: "100%",
//     height: "100%",
//     dataFormat: "json",
//     dataSource
//   }).render();
// });


                
                
            });
    
    }
    

}]);