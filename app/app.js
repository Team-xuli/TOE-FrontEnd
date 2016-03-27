'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
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


