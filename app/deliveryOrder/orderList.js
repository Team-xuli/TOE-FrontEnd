/**
 * Created by Administrator on 2016/3/25.
 */
'use strict';
//.constant("requestUrl","mockdata/tickeHistory.json")
angular.module('myApp.orderList', ['ngRoute','ngResource'])
.controller('orderListCtrl', ['$scope','$location','$resource','$http','urlHeader',function($scope,$location,$resource,$http,urlHeader) {
    var requestUrl = 'mockdata/ticketHistory.json';
    $scope.orderListResource = $resource(requestUrl+'');

    $scope.orderList = function () {
        $scope.orders = $scope.orderListResource.query();
    }

    $scope.orderList();
}])