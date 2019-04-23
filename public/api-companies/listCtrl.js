/* global angular $scope*/

var app = angular.module("CompaniesApp");


app.controller("ListCtrl", ["$scope", "$http", function($scope, $http) {
    console.log("Companies ListCtrl Initialized!");
    var API = "/api-companies/v1/companies-stats/";
    var search = "?";
    var limit = 10;
    var offset = 0;
    var paginationString = "";
    $scope.currentPage = 1;
    $scope.data1 = "¡Bienvenidos!";
    $scope.data2 = "Los datos se encuentran actualizados";

    refresh();

    function refresh() {
        paginationString = "&limit=" + limit + "&offset=" + offset;
        $http.get(API + search + paginationString).then(function(response) {
            console.log("Datos recibidos: " + JSON.stringify(response.data, null, 2));
            $scope.companies = response.data;
            $scope.previousPage = function() {
                if ($scope.currentPage > 1) {
                    offset -= limit;
                    refresh();
                    $scope.currentPage -= 1;
                }
            };
            $scope.searchCompany1 = function() {
                search = "?";
                paginationString = "";

                refresh();
            }
            $scope.searchCompany2 = function() {
                if ($scope.searchForm.company) {
                    search += ("&company=" + $scope.searchForm.company);
                }
                if ($scope.searchForm.country) {
                    search += ("&country=" + $scope.searchForm.country);
                }
                if ($scope.searchForm.year) {
                    search += ("&year=" + $scope.searchForm.year);
                }
                if ($scope.searchForm.income) {
                    search += ("&income=" + $scope.searchForm.income);
                }
                if ($scope.searchForm.marketcapitalization) {
                    console.log($scope.searchForm.marketcapitalization);
                    search += ("&marketcapitalization=" + $scope.searchForm.marketcapitalization);
                }
                if ($scope.searchForm.employee) {
                    search += ("&employee=" + $scope.searchForm.employee);
                }
                if ($scope.searchForm.from) {
                    search += ("&from=" + $scope.searchForm.from);
                }
                if ($scope.searchForm.to) {
                    search += ("&to=" + $scope.searchForm.to);
                }
                window.alert("Búsqueda realizada");
                console.log(search);
                refresh();
                search = "?";
            };

            $scope.nextPage = function() {
                if ($scope.companies.length == limit) {
                    offset += limit;
                    refresh();
                    $scope.currentPage += 1;
                }
            };
        }, function(error) {
            $scope.status = error.status;
            $scope.data = "";
        });

    }



    $scope.addCompany = function() {
        var newCompany = $scope.newCompany;
        console.log("nueva compañia: " + JSON.stringify(newCompany, null, 2));
        $http.post(API, newCompany).then(function(response) {
            $scope.data1 = "¡Genial!";
            $scope.data2 = "Creado con éxito";
            console.log("Response : " + response.status + response.data);
            refresh();
        }, function(error) {
            $scope.data1 = "¡Ohh!";
            $scope.data2 = "Rellene los campos correctamente";
            $scope.status = error.status;
            
        });
    };

    $scope.deleteCompany = function(country, year) {
        console.log("Borrando compañia cuyo country es: " + country);
        console.log("Borrando compañia cuyo year es: " + year);
        console.log(API + country + "/" + year);
        if (confirm("¿Desea borrar los datos?")) {
            $http.delete(API + country + "/" + year).then(function(response) {
                $scope.data1 = "¡Genial!";
                $scope.data2 = "Ha sido borrada la empresa cuyo año es " + year + " y su país es " + country;
                console.log("Response : " + response.status + response.data);
                refresh();
            }, function(error) {
                $scope.status = error.status;
                $scope.data1 = "¡Ohh!";
                $scope.data2 = "No se puede borrar";
            });
        };
    }

    $scope.deleteCompanyAll = function() {
        if (confirm("¿Desea borrarlo todo?")) {
            $http.delete(API).then(function(response) {
                $scope.data1 = "¡Genial!";
                $scope.data2 = "Borraste todo con éxito";
                console.log("Response : " + response.status + response.data);
                refresh();
            }, function(error) {
                $scope.status = error.status;
                $scope.data1 = "¡Ohh!";
                $scope.data2 = "No se puede borrar";
            });
        };
    };
    $scope.restaurar = function() {
        if (confirm("¿Desea cargar los datos iniciales?")) {
            $http.get(API + "loadInitialData").then(function(response) {
                console.log("Response : " + response.status + response.data);
                $scope.data1 = "¡Genial!";
                $scope.data2 = "Restauraste los datos con éxito";
                refresh();
            }).catch(function(response) {
                $scope.data1 = "¡Aviso!";
                $scope.data2 = "Para restaurar los datos debe previamente borrar todos los registros";
                $scope.status = response.status;
                $scope.statusInfo = JSON.stringify(response.status, null, 2);
            });
        };

    }

}]);
