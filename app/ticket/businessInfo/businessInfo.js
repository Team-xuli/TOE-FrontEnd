/**
 * Created by Administrator on 2016/3/25.
 */
'use strict';
//.constant("requestUrl","mockdata/tickeHistory.json")
angular.module('myApp.businessInfo', ['ngRoute','ngResource'])
.controller('businessInfoCtrl', ['$scope','$location','$resource','$http','urlHeader',function($scope,$location,$resource,$http,urlHeader) {
    //var requestUrl = 'mockdata/ticketHistory.json';
    //$scope.orderListResource = $resource(requestUrl+'');
    //
    //$scope.orderList = function () {
    //    $scope.orders = $scope.orderListResource.query();
    //}
    //
    //$scope.orderList();
    var userAddressInfo
    var requestUrl = urlHeader+'user/addresses';

    $scope.businessInfo = {
        addressId:0,
        addressDesc:'',
        calledName:'',
        phoneNo:'',
        addressExist:false
    };
    var addressInfoRequest = $http({
        url:requestUrl,
        //urlHeader+'user/addresses',
        method:'GET',
    })
        .success(function(addressData){
            if(addressData.length > 0){
                userAddressInfo = addressData[0];
                $scope.businessInfo.addressId  = userAddressInfo.addressId;
                $scope.businessInfo.addressDesc  = userAddressInfo.addressDesc;
                $scope.businessInfo.calledName = userAddressInfo.calledName;
                $scope.businessInfo.phoneNo = userAddressInfo.phoneNo;
                $scope.businessInfo.addressExist = true;
            }

        })
        .error(function(){
            alert('内部错误！！！');
        })

    var username = location.hash.slice(18);

    $scope.returnMainPage = function(){
        $location.path('/ticket').search('username='+loginData.username).replace();
    }

    $scope.changeInfo = function(businessInfo){
        var addressId = $scope.businessInfo.addressId;
        var calledName=$scope.businessInfo.calledName;
        var phoneNo = $scope.businessInfo.phoneNo;
        var addressDesc = $scope.businessInfo.addressDesc;
        if($scope.businessInfo.addressExist === true){
            var request = $http({
                url:urlHeader+'user/address',
                method:'PUT',
                data:{
                    "addressId":addressId,
                    "calledName":calledName,
                    "phoneNo":phoneNo,
                    "addressDesc":addressDesc
                }
            })
                .success(function(loginData){
                    alert('修改成功！！！')
                })
                .error(function(loginData){
                    alert('炸了！！！')
                })
        }else{
            var request = $http({
                url:urlHeader+'user/address',
                method:'POST',
                data:{
                    "addressId":addressId,
                    "calledName":calledName,
                    "phoneNo":phoneNo,
                    "addressDesc":addressDesc
                }
            })
                .success(function(loginData){
                    alert('新增成功！！！')
                })
                .error(function(loginData){
                    alert('炸了！！！')
                })
        }


    }
}])
