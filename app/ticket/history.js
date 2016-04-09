/**
 * Created by Administrator on 2016/3/19.
 */

'use strict';
//.constant("requestUrl","mockdata/tickeHistory.json")
angular.module('myApp.ticketHistory', ['ngRoute','ngResource'])

    .config(['$routeProvider','$httpProvider', function($routeProvider,$httpProvider) {
        $httpProvider.defaults.withCredentials = true;
        $routeProvider.when('/ticketHistory', {
            templateUrl: 'ticket/history.html',
            controller: 'ticketHistoryCtrl'
        });
    }])

    .controller('ticketHistoryCtrl', ['$scope','$location','$resource','$http','urlHeader',function($scope,$location,$resource,$http,urlHeader) {
        var history = {};
        $scope.historyInfo ={
            description:''
        };
        var historyRequest = $http({
            url:urlHeader+'order/history',
            data:{
                pageNo:1,
                countPerPage:100
            },
            method:'POST',
        })
            .success(function(historyData){
                $scope.history = historyData.orders;
            })
            .error(function(loginData){
                alert('炸了！！！');
            })
        $scope.checkOrder = function(item){
            console.log(item);
            $scope.historyInfo.description =item.description;
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
           return item.createTime;
       }
    }])
