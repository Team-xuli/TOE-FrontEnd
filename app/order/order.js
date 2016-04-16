'use strict';

angular.module('myApp.order', ['ngRoute','ngResource'])
.controller('orderCtrl', ["$scope","$location","addressService","orderService",function($scope,$location,addressService,orderService) {
    $scope.orgAddresses = null;
    addressService.fetchOrgAddresses(function(){
        $scope.orgAddresses = addressService.orgAddresses;
        if($scope.orgAddresses.length == 0){
            alert("请先创建一个起始地址");
            $location.path("/addressInfo").replace();
        }
    });

    $scope.orderInfo = {
        description:'',
        payment:'',
        orgAddress:null,
        newDestAddress:true,
        destAddress:{
            addressId:0,
            calledName:'',
            phoneNo:'',
            addressDesc:'',
            addressData:''
        }
    };
    $scope.addOrder = function(order){
        orderService.addOrder(order,function(){
            $location.path('/orderHistory').replace();
        });
    }
}]);