/**
 * Created by Administrator on 2016/3/19.
 */

'use strict';

angular.module('myApp.ticketHistory', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/ticketHistory', {
            templateUrl: 'ticket/history.html',
            controller: 'ticketHistoryCtrl'
        });
    }])

    .controller('ticketHistoryCtrl', ['$scope','$location','$window','$http',function($scope,$location,$window,$http) {


    }])
