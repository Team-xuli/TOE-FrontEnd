/**
 * Created by Administrator on 2016/3/25.
 */
'use strict';
//.constant("requestUrl","mockdata/tickeHistory.json")
angular.module('myApp.ticketHistory', ['ngRoute','ngResource'])

    .config(['$routeProvider','$httpProvider', function($routeProvider,$httpProvider) {
        $httpProvider.defaults.withCredentials = true;
        $routeProvider.when('/deliveryOrder', {
            templateUrl: 'deliverOrder/orderList.html',
            controller: 'orderListCtrl'
        });
    }])

    .controller('ticketHistoryCtrl', ['$scope','$location','$resource','$http',function($scope,$location,$resource,$http) {
        var requestUrl = 'mockdata/ticketHistory.json';
        $scope.ticketHistoryResource = $resource(requestUrl+'');

        $scope.historyList = function () {
            $scope.history = $scope.ticketHistoryResource.query();
        }

        $scope.historyList();
    }])