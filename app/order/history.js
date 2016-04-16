/**
 * Created by Administrator on 2016/3/19.
 */

'use strict';
//.constant("requestUrl","mockdata/tickeHistory.json")
angular.module('myApp.orderHistory', ['ngRoute','ngResource','tm.pagination'])

    .config(['$routeProvider','$httpProvider', function($routeProvider,$httpProvider) {
        $httpProvider.defaults.withCredentials = true;
        $routeProvider.when('/orderHistory', {
            templateUrl: 'order/history.html',
            controller: 'orderHistoryCtrl'
        });
    }])

    .controller('orderHistoryCtrl', [
        '$scope',
        '$location',
        '$resource',
        '$http',
        'urlHeader',
        'userService',
        'statusCodeConvertService',
        'historyService',
        function($scope,$location,$resource,$http,urlHeader,userService,statusCodeConvertService,historyService) {
        var history = {};
        //$scope.showCancelBtn = userService.isUserAnOwner();
        $scope.showFinishBtn = userService.isUserAnDeliverer();
        $scope.historyInfo ={
            description:''
        };
        var GetAllHistory = function () {

            var postData = {
                pageNo: $scope.paginationConf.currentPage,
                countPerPage: $scope.paginationConf.itemsPerPage
            }

            historyService.list(postData).success(function (response) {
                console.log(response);
                $scope.paginationConf.totalItems = response.ordersCount;
                $scope.history = response.orders;
            });

        }

        //配置分页基本参数
        $scope.paginationConf = {
            currentPage: 1,
            itemsPerPage: 5
        };
        $scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', GetAllHistory);
    //var historyRequest = $http({
        //    url:urlHeader+'order/history',
        //    data:{
        //        pageNo:1,
        //        countPerPage:100
        //    },
        //    method:'POST',
        //})
        //    .success(function(historyData){
        //        $scope.history = historyData.orders;
        //    })
        //    .error(function(loginData){
        //        alert('炸了！！！');
        //    })
        $scope.checkOrder = function(item){
            console.log(item);
            $scope.historyInfo.description =item.description;
            $scope.historyInfo.destCalledName = item.destAddress.calledName;
            $scope.historyInfo.destPhoneNo = item.destAddress.phoneNo;
        }

        $scope.deleteOrder = function (item){
            var deleteOrderRequest = $http({
                url:urlHeader+'order/'+item.orderId,
                //urlHeader+'user/addresses',
                method:'DELETE',
            })
                .success(function(data){
                    if(data.status === 10){
                        item.status = data.status;
                    }
                })
        }

        $scope.destination = function(item){
            return item.destAddress.addressDesc;
        }

        $scope.startTime = function(item){
            //var createTime=new Date(parseInt(item.createTime) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');
            var newDate = new Date();
            newDate.setTime(item.createTime );
            return  newDate.toLocaleString();
            //var createTime = new Date(parseInt(item.createTime) * 1000).toLocaleString()
           // return createTime;
       }

        $scope.finishOrder = function(item){
            var deleteOrderRequest = $http({
                url:urlHeader+'order/achievement',
                data:item,
                //urlHeader+'user/addresses',
                method:'POST',
            })
                .success(function(data){
                    alert('完成了！！')
                })
        }

        $scope.status = function(item){
            return  statusCodeConvertService.codeConvert(item.status);
        }

        $scope.address =function(item){
            return item.orgAddress.addressDesc;
        }

    }])
