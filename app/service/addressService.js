/**
 * Created by Daniel on 2016/4/9.
 */
'use strict';

/* userService */

var services = angular.module('myApp.addressService', ['ngResource']).
    value('version', '1.0');

services.service('addressService', ['$http','userService','urlHeader',function ($http,userService,urlHeader){
    this.maxAddressCount = 5;

    this.orgAddresses = [];
    this.destAddresses = [];

    this.deleteAddress = function(data,successCallback, errorCallback){
        $http({
            url:urlHeader+'user/address/' + data.addressId,
            method:'DELETE'
        })
            .success(function(data){
                if(successCallback){
                    successCallback();
                }
            })
            .error(function(data){
                if(errorCallback){
                    errorCallback();
                }
                alert('删除失败！' + data.message)
            })
    };

    this.modifyAddress = function(data,successCallback, errorCallback){
        $http({
            url:urlHeader+'user/address',
            method:'PUT',
            data:data
        })
            .success(function(data){
                if(successCallback){
                    successCallback();
                }
            })
            .error(function(data){
                if(errorCallback){
                    errorCallback();
                }
                alert('修改失败！' + data.message)
            })
    };
    this.addAddress = function(data,successCallback, errorCallback){
        if(this.maxAddressCount > this.orgAddresses.length)
            $http({
                url:urlHeader+'user/address',
                method:'POST',
                data:data
            })
                .success(function(data){
                    if(successCallback){
                        successCallback();
                    }
                })
                .error(function(data){
                    if(errorCallback){
                        errorCallback();
                    }
                    alert('新增失败！' + data.message)
                })
    };
    this.fetchOrgAddresses = function(successCallback){
        var localThis = this;
        $http({
            url:urlHeader + 'user/addresses/org',
            method:'GET'
        }).success(function(data){
            localThis.orgAddresses = data;
            if (successCallback) {
                successCallback();
            }
        }).error(function(data){
            alert('源地址获取失败！' + data.message)
        })
    };
    this.fetchDestAddresses = function(successCallback){
        var localThis = this;
        $http({
            url:urlHeader + 'user/addresses/dest',
            method:'GET'
        }).success(function(data){
            localThis.destAddresses = data;
            if (successCallback) {
                successCallback();
            }
        }).error(function(data){
            alert('目的地址获取失败！' + data.message)
        })
    };
    this.isOrgAddressesFull = function(){
        return this.orgAddresses.length >= this.maxAddressCount;
    }
}]);