'use strict';

// Declare app level module which depends on views, and components
var myApp = angular.module('myApp', [
  'ngRoute',
  'myApp.login',
  'myApp.register',
  'myApp.ticket',
  'myApp.ticketHistory',
  'myApp.orderList',
  'myApp.businessInfo',
  //'myApp.service',
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
      when('/ticket', {
        templateUrl: 'ticket/ticket.html',
        controller: 'ticketCtrl'
      }).
      when('/businessInfo', {
        templateUrl: 'ticket/businessInfo/businessInfo.html',
        controller: 'businessInfoCtrl'
      }).
      when('/deliveryOrder', {
        templateUrl: 'deliveryOrder/orderList.html',
        controller: 'orderListCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
};

myApp.config(routeConfig);

myApp.constant('urlHeader','http://192.168.1.6:7777/');


