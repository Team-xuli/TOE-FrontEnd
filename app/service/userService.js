/**
 * Created by Administrator on 2016/3/5.
 */
'use strict';

/* userService */

var services = angular.module('myApp.userService', ['ngResource']).
    value('version', '1.0');

services.service('userService', ['$http','urlHeader',function ($http,urlHeader) {
    this.user = {
        userId:0,
        username:'',
        password:'',
        money:0,
        credit:0,
        role:''
    };

    this.clear = function(){
        this.user.userId = 0;
        this.user.username = '';
        this.user.password = '';
        this.user.money = 0;
        this.user.credit = 0;
        this.user.role = '';
    };

    this.assignUserBasicInfo = function(data){
        this.user.userId = data.userId;
        this.user.username = data.username;
        this.user.password = data.password;
        this.user.money = data.money;
        this.user.credit = data.credit;
        this.user.role = data.role;
    };
    this.tryFetchUserInfo = function(successCallback){
        var localThis = this;
        $http({
            url: urlHeader + 'user',
            method: 'GET'
        }).success(function (data) {
            localThis.assignUserBasicInfo(data);
            if (successCallback) {
                successCallback();
            }
        });
    };
    this.fetchUserInfo = function(username,password,successCallback){
        var localThis = this;
        $http({
            url: urlHeader + 'user',
            headers: {
                'Authorization': 'Basic ' + btoa(username + ':' + password)
            },
            method: 'GET'
        }).success(function (data) {
            localThis.assignUserBasicInfo(data);
            if (successCallback) {
                successCallback();
            }
        }).error(function (data) {
            alert('用户名或密码错误！' + data.message)
        });
    };

    this.changeUserPassword = function(changInfo){
        var localThis = this;
        $http({
            url:urlHeader+'user/password',
            //headers: {
            //    'Authorization': 'Basic ' + btoa(user.username + ':' + user.password)
            //},
            data:{
                oldPassword:changInfo.oldPassword,
                newPassword:changInfo.newPassword
            },
            method:'PUT'
        }).success(function(data){
            alert('1');
        })

    }

    this.isUserValid = function(){
       return this.user.userId != 0;
    };

    this.logout = function(successCallback){
        var localThis = this;
        localThis.clear();
        if (successCallback) {
            successCallback();
        }
        //var localThis = this;
        //$http({
        //    url:urlHeader + 'signout',
        //    method:'GET'
        //}).success(function(data){
        //    localThis.clear();
        //    if (successCallback) {
        //        successCallback();
        //    }
        //}).error(function(loginData){
        //    alert('注销失败！')
        //})
    };
    this.isUserAnOwner = function(){
        return this.user.role == 'ROLE_OWNER';
    };
    this.isUserAnDeliverer = function(){
        return this.user.role == 'ROLE_DELIVERER';
    };
}]);