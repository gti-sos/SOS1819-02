        
        /*global angular*/
        
        angular.module("AppManager",["ngRoute"])
            .config(function($routeProvider){
             $routeProvider
             .when("/",{
              templateUrl:"/principal.html",
           
             })
             .when("/ui/v1/companies-stats/#!/",{
              templateUrl:"./api-companies/list.html",
              controller: "ListCtrl"
             })
             .when("/api-companies/:country/:year",{
              templateUrl:"./api-companies/edit.html",
              controller: "editCtrl"
             });
            });