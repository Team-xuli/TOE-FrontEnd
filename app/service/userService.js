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
    this.authorizationHearder = function(){
        return {
            'Authorization': 'Basic ' + btoa(this.user.username + ':' + this.user.password)
        }
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
    this.register = function(username,password,role){
        return $http({
            url:urlHeader+'signup',
            method:'POST',
            data:{
                "username":username,
                "password":password,
                "role":role
            }
        });
    };
    this.tryFetchUserInfo = function(){
        return $http({
            url: urlHeader + 'user',
            method: 'GET'
        });
    };
    this.fetchUserInfo = function(username,password){
        var localThis = this;
        return $http({
            url: urlHeader + 'user',
            headers: {
                'Authorization': 'Basic ' + btoa(username + ':' + password)
            },
            method: 'GET'
        }).success(function (res){
            localThis.assignUserBasicInfo(res);
        });
    };

    this.changeUserPassword = function(changInfo){
        return $http({
            url:urlHeader+'user/password',
            header:this.authorizationHearder,
            data:{
                oldPassword:changInfo.oldPassword,
                newPassword:changInfo.newPassword
            },
            method:'PUT'
        });
    };

    this.isUserValid = function(){
       return this.user.userId != 0;
    };

    this.logout = function(){
        var localThis = this;
        localThis.clear();
        //var localThis = this;
        //$http({
        //    url:urlHeader + 'signout',
        //    header:this.authorizationHearder,
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
    this.isUserOwner = function(){
        return this.user.role == 'ROLE_OWNER';
    };
    this.isUserDeliverer = function(){
        return this.user.role == 'ROLE_DELIVERER';
    };
}]);