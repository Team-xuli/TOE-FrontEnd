'use strict';

angular.module('myApp.ticket', ['ngRoute','ngResource'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/ticket', {
        templateUrl: 'ticket/ticket.html',
        controller: 'ticketCtrl'
    });
}])

.controller('ticketCtrl', ["$scope","$location","$resource","urlHeader",function($scope,$location,$resource,urlHeader) {
    var requestUrl = urlHeader+'user/addresses';
    $scope.ticketInfo = {
        initialAddress:''
    }
    $scope.addressResource = $resource(requestUrl+'');

    $scope.getAddresses = function () {
        //$scope.addressResource.query().$promise.then(data){
        //    console.log(data);
        //}
        $scope.addressResource.query().$promise.then(function(addressData){
            //$scope.ticketInfo.initialAddress = addressData[0].addressDesc;
            $scope.ticketInfo.initialAddress = addressData[0].addressDesc;
        });
    }

    $scope.getAddresses();

    var username = location.hash.slice(18);
    $scope.checkHistory = function(){
        //console.log(1)
        $location.path('/ticketHistory').search('username='+username).replace();

    }

    $scope.changeBusinessInfo = function(){
        $location.path('/businessInfo').search('username='+username).replace();
    }

    $scope.submitOrder = function(ticketInfo){
        console.log(ticketInfo.initialAddress+ticketInfo.aimAddress+ticketInfo.description);
    }

}]);