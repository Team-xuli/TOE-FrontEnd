/**
 * Created by Daniel on 2016/4/9.
 */
'use strict';

/* addressService */

var services = angular.module('myApp.addressService', ['ngResource']).
    value('version', '1.0');

services.service('addressService', ['$http','userService','urlHeader',function ($http,userService,urlHeader){
    this.maxAddressCount = 5;

    this.orgAddresses = [];
    this.destAddresses = [];

    this.deleteAddress = function(address){
        return $http({
            url:urlHeader+'user/address/' + address.addressId,
            headers: userService.authorizationHearder(),
            method:'DELETE'
        });
    };

    this.modifyAddress = function(address){
        return $http({
            url:urlHeader+'user/address',
            headers: userService.authorizationHearder(),
            method:'PUT',
            data:address
        });
    };
    this.addAddress = function(address){
        if(this.maxAddressCount > this.orgAddresses.length){
            return  $http({
                url:urlHeader+'user/address',
                headers: userService.authorizationHearder(),
                method:'POST',
                data:address
            });
        }else{
            alert("默认地址最多有"+maxAddressCount+"个！");
        }
    };
    this.fetchOrgAddresses = function(){
        var localThis = this;
        return $http({
            url:urlHeader + 'user/addresses/org',
            headers: userService.authorizationHearder(),
            method:'GET'
        }).success(function(res){
            localThis.orgAddresses = res;
        });
    };
    this.fetchDestAddresses = function(){
        var localThis = this;
        return $http({
            url:urlHeader + 'user/addresses/dest',
            headers: userService.authorizationHearder(),
            method:'GET'
        }).success(function(res){
            localThis.destAddresses = res;
        });
    };
    this.isOrgAddressesFull = function(){
        return this.orgAddresses.length >= this.maxAddressCount;
    }
}]);