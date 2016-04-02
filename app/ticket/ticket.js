'use strict';

angular.module('myApp.ticket', ['ngRoute','ngResource'])
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

    $scope.submitOrder = function(ticketInfo){
        console.log(ticketInfo.initialAddress+ticketInfo.aimAddress+ticketInfo.description);
    }

}]);