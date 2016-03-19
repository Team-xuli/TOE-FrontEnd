'use strict';

angular.module('myApp.ticket', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/ticket', {
        templateUrl: 'ticket/ticket.html',
        controller: 'ticketCtrl'
    });
}])

.controller('ticketCtrl', ["$scope","$location",function($scope,$location) {
    $scope.checkHistory = function(){
        //console.log(1);
        var username = location.hash.slice(18);
        $location.path('/ticketHistory').search('username='+username).replace();

    }
    $scope.submitOrder = function(ticketInfo){
        console.log(ticketInfo.initialAddress+ticketInfo.aimAddress+ticketInfo.description);
    }
}]);