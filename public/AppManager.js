        
        /*global angular*/
        
        angular.module("AppManager",["ngRoute"])
            .config(function($routeProvider){
             $routeProvider
             .when("/",{
              templateUrl:"/AppMenu.html",
           
             })
             .when("/api-companies/",{
              templateUrl:"./api-companies/list.html",
              controller: "ListCtrl"
             })
             .when("/api-companies/:country/:year",{
              templateUrl:"./api-companies/edit.html",
              controller: "editCtrl"
             });
            });