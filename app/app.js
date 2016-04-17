'use strict';

// Declare app level module which depends on views, and components
var myApp = angular.module('myApp', [
    'ngRoute',
    'myApp.login',
    'myApp.register',
    'myApp.basicInfo',
    'myApp.order',
    'myApp.orderHistory',
    'myApp.orderNearby',
    'myApp.addressInfo',
    'myApp.userService',
    'myApp.addressService',
    'myApp.orderService',
    'myApp.statusCodeConvertService',
    'myApp.version'
]);

myApp.config(function ($routeProvider){
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
            templateUrl: 'order/orderNearby.html',
            controller: 'orderNearbyCtrl'
        }).
        when('/orderHistory', {
            templateUrl: 'order/orderHistory.html',
            controller: 'orderHistoryCtrl'
        }).
        when('/addressInfo',{
            templateUrl: 'user/addressInfo.html',
            controller: 'addressInfoCtrl'
        }).
        when('/basicInfo',{
            templateUrl: 'user/basicInfo.html',
            controller: 'basicInfoCtrl'
        }).
        otherwise({
            redirectTo: '/'
        });
});

myApp.constant('urlHeader','http://192.168.1.2:7777/');
myApp.constant('AUTH_EVENTS', {
    loginSuccess: 'auth-login-success',
    loginFailed: 'auth-login-failed',
    logoutSuccess: 'auth-logout-success',
    sessionTimeout: 'auth-session-timeout',
    notAuthenticated: 'auth-not-authenticated',
    notAuthorized: 'auth-not-authorized'
});

myApp.controller('indexController',['$scope','$location','AUTH_EVENTS','userService',function($scope,$location,AUTH_EVENTS,userService){
    $scope.isUserValid = false;
    $scope.showOwnerMenu = false;
    $scope.showDelivererMenu = false;

    $scope.onUserChangeHandler = function(){
        $scope.isUserValid = userService.isUserValid();
        $scope.showOwnerMenu = $scope.isUserValid && userService.isUserOwner();
        $scope.showDelivererMenu = $scope.isUserValid && userService.isUserDeliverer();
    };

    $scope.$on(AUTH_EVENTS.loginSuccess, function() {
        $scope.onUserChangeHandler();
    });
    $scope.logout = function() {
        userService.logout();
        $location.path('/login').replace();
        $scope.onUserChangeHandler();
    };
    userService.tryFetchUserInfo(function(){
        $scope.onUserChangeHandler()
    });

}]);



