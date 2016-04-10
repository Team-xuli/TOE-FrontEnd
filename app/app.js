'use strict';

// Declare app level module which depends on views, and components
var myApp = angular.module('myApp', [
    'ngRoute',
    'myApp.login',
    'myApp.register',
    'myApp.order',
    'myApp.orderHistory',
    'myApp.orderList',
    'myApp.addressInfo',
    'myApp.userService',
    'myApp.addressService',
    'myApp.orderService',
    'myApp.statusCodeConvertService',
    'myApp.selfInfo',
    'myApp.version'
]);
function routeConfig($routeProvider){
  $routeProvider.
      when('/', {
        templateUrl: 'login/login.html',
        controller: 'loginCtrl'
      }).
      when('/login', {
        templateUrl: 'login/login.html',
        controller: 'loginCtrl'
      }).
      when('/register', {
        templateUrl: 'register/register.html',
        controller: 'registerCtrl'
      }).
      when('/order', {
        templateUrl: 'order/order.html',
        controller: 'orderCtrl'
      }).
      when('/deliveryOrder', {
        templateUrl: 'deliveryOrder/orderList.html',
        controller: 'orderListCtrl'
      }).
      when('/addressInfo',{
          templateUrl: 'addressInfo/addressInfo.html',
          controller: 'addressInfoCtrl'
      }).
      when('/selfInfo',{
          templateUrl: 'selfInfo/selfInfo.html',
          controller: 'selfInfoCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
};

myApp.config(routeConfig);
myApp.constant('urlHeader','http://192.168.1.2:7777/');

myApp.controller('indexController',['$scope','$location','userService',function($scope,$location,userService){
    $scope.isUserValid = false;
    $scope.showOwnerMenu = false;
    $scope.showDelivererMenu = false;

    $scope.onUserChangeHandler = function(){
        $scope.isUserValid = userService.isUserValid();
        $scope.showOwnerMenu = $scope.isUserValid && userService.isUserAnOwner();
        $scope.showDelivererMenu = $scope.isUserValid && userService.isUserAnDeliverer();
    };

    $scope.$on('event.userChange', function(event) {
        $scope.onUserChangeHandler();
    });

    $scope.logout = function(){
        userService.logout(function(){
            $location.path('/login').replace();
            $scope.onUserChangeHandler();
        });
    };
    userService.tryFetchUserInfo(function(){
        $scope.onUserChangeHandler()
    });

}]);



