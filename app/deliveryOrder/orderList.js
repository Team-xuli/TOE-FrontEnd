/**
 * Created by Administrator on 2016/3/25.
 */
'use strict';
//.constant("requestUrl","mockdata/tickeHistory.json")
angular.module('myApp.orderList', ['ngRoute','ngResource'])

    .config(['$routeProvider','$httpProvider', function($routeProvider,$httpProvider) {
        $httpProvider.defaults.withCredentials = true;
        $routeProvider.when('/deliveryOrder', {
            templateUrl: 'deliveryOrder/orderList.html',
            controller: 'orderListCtrl'
        });
    }])

    .controller('orderListCtrl', ['$scope','$location','$resource','$http',function($scope,$location,$resource,$http) {
        var requestUrl = 'mockdata/ticketHistory.json';
        $scope.orderListResource = $resource(requestUrl+'');

        $scope.orderList = function () {
            $scope.orders = $scope.orderListResource.query();
        }

        $scope.orderList();
    }])