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
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/login'});
  //$stateProvider
  //    .state('ticket', {
  //      abstract: true,
  //      url: "/ticket",
  //      templateUrl: "ticket/ticket.html",
  //    })
}]);

myApp.constant('urlHeader','http://192.168.1.6:7777/');


