/**
 * Created by Administrator on 2016/3/25.
 */
'use strict';
//.constant("requestUrl","mockdata/tickeHistory.json")
angular.module('myApp.orderList', ['ngRoute','ngResource'])
.controller('orderListCtrl', ['$scope','$location','$resource','$http','urlHeader','statusCodeConvertService',function($scope,$location,$resource,$http,urlHeader,statusCodeConvertService) {
        var orders = {};
        $scope.orderInfo ={
            description:''
        };
        var orderRequest = $http({
            url:urlHeader+'order/nearby',
            data:{
                pageNo:1,
                countPerPage:100
            },
            method:'POST',
        })
            .success(function(orderData){
                console.log(orderData);
                $scope.orders = orderData.orders;
            })
            .error(function(loginData){
                alert('炸了！！！');
            })
        $scope.checkOrder = function(item){
            console.log(item);
            $scope.orderInfo.description =item.description;
        }

        $scope.takeOrder = function (item){
            var takeOrderRequest = $http({
                url:urlHeader+'order/assignment',
                //urlHeader+'user/addresses',
                data:item,
                method:'POST',
            })
                .success(function(data){
                    console.log(data);
                })
        }
        $scope.status = function(item){
            return statusCodeConvertService.codeConvert(item.status);
        }

        $scope.initialDestination = function(item){
            return item.orgAddress.addressDesc;
        }

        $scope.aimDestination = function(item){
            return item.destAddress.addressDesc;
        }

        $scope.startTime = function(item){
            var newDate = new Date();
            newDate.setTime(item.createTime );
            return  newDate.toLocaleString();
        }
}])