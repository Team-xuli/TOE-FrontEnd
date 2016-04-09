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
        role:'',
        orgAddresses:[],
        destAddresses:[],
    };

    this.clear = function(){
        this.user.userId = 0;
        this.user.username = '';
        this.user.password = '';
        this.user.money = 0;
        this.user.credit = 0;
        this.user.role = '';
        this.orgAddresses = [];
        this.destAddresses = [];
    }

    this.assignUserBasicInfo = function(data){
        this.user.userId = data.userId;
        this.user.username = data.username;
        this.user.password = data.password;
        this.user.money = data.money;
        this.user.credit = data.credit;
        this.user.role = data.role;
    };
    this.tryFetchUserInfo = function(callback){
        var localThis = this;
        $http({
            url: urlHeader + 'user',
            method: 'GET'
        }).success(function (data) {
            localThis.assignUserBasicInfo(data);
            if (callback) {
                callback();
            }
        });
    };
    this.fetchUserInfo = function(username,password,callback){
        var localThis = this;
        $http({
            url: urlHeader + 'user',
            headers: {
                'Authorization': 'Basic ' + btoa(username + ':' + password)
            },
            method: 'GET'
        }).success(function (data) {
            localThis.assignUserBasicInfo(data);
            if (callback) {
                callback();
            }
        }).error(function (loginData) {
            alert('用户名或密码错误！')
        });
    };
    this.fetchOrgAddresses = function(callback){
        var localThis = this;
        $http({
            url:urlHeader + 'addresses/org',
            method:'GET'
        }).success(function(data){
            localThis.user.orgAddresses = data;
            if (callback) {
                callback();
            }
        }).error(function(loginData){
            alert('起始地址获取失败！')
        })
    };
    this.fetchDestAddresses = function(callback){
        var localThis = this;
        $http({
            url:urlHeader + 'addresses/dest',
            method:'GET'
        }).success(function(data){
            localThis.user.destAddresses = data;
            if (callback) {
                callback();
            }
        }).error(function(loginData){
            alert('目的地址获取失败！')
        })
    };

    this.isUserValid = function(){
       return this.user.userId != 0;
    };

    this.logout = function(callback){
        var localThis = this;
        localThis.clear();
        if (callback) {
            callback();
        }
        //var localThis = this;
        //$http({
        //    url:urlHeader + 'signout',
        //    method:'GET'
        //}).success(function(data){
        //    localThis.clear();
        //    if (callback) {
        //        callback();
        //    }
        //}).error(function(loginData){
        //    alert('注销失败！')
        //})
    }
    this.isUserAnOwner = function(){
        return this.user.role == 'ROLE_OWNER';
    }
    this.isUserAnDeliverer = function(){
        return this.user.role == 'ROLE_DELIVERER';
    }
}]);