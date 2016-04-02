/**
 * Created by Administrator on 2016/3/25.
 */
'use strict';
//.constant("requestUrl","mockdata/tickeHistory.json")
angular.module('myApp.businessInfo', ['ngRoute','ngResource'])

    .config(['$routeProvider','$httpProvider', function($routeProvider,$httpProvider) {
        $httpProvider.defaults.withCredentials = true;
        $routeProvider.when('/businessInfo', {
            templateUrl: 'ticket/businessInfo/businessInfo.html',
            controller: 'businessInfoCtrl'
        });
    }])

    .controller('businessInfoCtrl', ['$scope','$location','$resource','$http','urlHeader',function($scope,$location,$resource,$http,urlHeader) {
        //var requestUrl = 'mockdata/ticketHistory.json';
        //$scope.orderListResource = $resource(requestUrl+'');
        //
        //$scope.orderList = function () {
        //    $scope.orders = $scope.orderListResource.query();
        //}
        //
        //$scope.orderList();

        console.log(1);
        var username = location.hash.slice(18);
        $scope.returnMainPage = function(){
            $location.path('/ticket').search('username='+loginData.username).replace();
        }
        $scope.changeInfo = function(businessInfo){
            var calledName= businessInfo.calledName;
            var phoneNum = businessInfo.phoneNum;
            var address = businessInfo.address;
            var loginRequest = $http({
                url:'http://192.168.1.7:7777/user/address',
                //headers: {
                //  'Authorization': 'Basic ' + btoa(email + ':' + password)
                //},//mockdata/login.json   192.68.1.9:7777/user/passport http://192.168.1.2:7777/hello
                //headers: {
                //    'Authorization': 'Basic ' + btoa('admin' + ':' + 'admin')
                //},
                method:'POST',
                data:{
                    "calledName":username,
                    "phoneNo":phoneNum,
                    "addressDesc":address
                }
            })
                .success(function(loginData){
                    alert('修改成功！！！')
                })
                .error(function(loginData){
                    alert('炸了！！！')
                })
        }
    }])
