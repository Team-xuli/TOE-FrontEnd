'use strict';

angular.module('myApp.ticket', ['ngRoute','ngResource'])
.controller('ticketCtrl', ["$scope","$location","$resource","$http","urlHeader",function($scope,$location,$resource,$http,urlHeader) {
    var userAddress
    $scope.ticketInfo = {
        orgAddressId:0,
        initialAddress:''
    };
    var addressRequest = $http({
        url:urlHeader+'user/addresses',
        //urlHeader+'user/addresses',
        method:'GET',
    })
        .success(function(addressData){
            if(addressData === []) {
                alert('还未有地址，添加一个新的地址！！');
            }else{
                userAddress = addressData[0];
                $scope.ticketInfo.initialAddress  = userAddress.addressDesc;
                $scope.ticketInfo.orgAddressId = userAddress.addressId;
            }
        })

    //$scope.addressResource = $resource(requestUrl+'');
    //
    //$scope.getAddresses = function () {
    //    //$scope.addressResource.query().$promise.then(data){
    //    //    console.log(data);
    //    //}
    //    $scope.addressResource.query().$promise.then(function(addressData){
    //        //$scope.ticketInfo.initialAddress = addressData[0].addressDesc;
    //        $scope.ticketInfo.initialAddress = addressData[0].addressDesc;
    //    });
    //}
    //
    //$scope.getAddresses();

    var username = location.hash.slice(18);

    $scope.submitOrder = function(ticketInfo){
        var createRequest = $http({
            url:urlHeader+'order',
            //urlHeader+'user/addresses',
            method:'POST',
            data:{
                "orgAddressId" :$scope.ticketInfo.orgAddressId,
                "newDestAddress":true,
                "description":$scope.ticketInfo.description,
                "destAddress":{
                    "calledName": $scope.ticketInfo.name,
                    "phoneNo": $scope.ticketInfo.contact,
                    "addressDesc": $scope.ticketInfo.aimAddress
                }
            }
        })
            .success(function(addressData){
                if(addressData === []) {
                    alert('还未有地址，添加一个新的地址！！');
                }else{
                    userAddress = addressData[0];
                    $scope.ticketInfo.initialAddress  = userAddress.addressDesc
                }
            })
        console.log(ticketInfo.initialAddress+ticketInfo.name+ticketInfo.contact+ticketInfo.aimAddress+ticketInfo.description);
    }

}]);