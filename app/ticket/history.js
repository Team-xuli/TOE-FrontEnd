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
        var requestUrl = 'mockdata/ticketHistory.json';
        $scope.ticketHistoryResource = $resource(requestUrl+'');

        $scope.historyList = function () {
            $scope.history = $scope.ticketHistoryResource.query();
        }

        $scope.historyList();
    }])
