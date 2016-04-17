/**
 * Created by Daniel on 2016/4/10.
 */
'use strict';

/* orderService */

var services = angular.module('myApp.orderService', ['ngResource']).
    value('version', '1.0');

services.service('orderService', ['$http','userService','urlHeader',function ($http,userService,urlHeader) {
    this.assignOrder = function(order){
        return $http({
            url:urlHeader+'order/assignment',
            headers: userService.authorizationHearder(),
            data:order,
            method:'POST'
        });
    };
    this.closeOrder = function(order){
        return $http({
            url:urlHeader+'order/achievement',
            headers: userService.authorizationHearder(),
            data:order,
            method:'POST',
        });
    };
    this.deleteOrder = function(order){
        return $http({
            url:urlHeader+'order/'+order.orderId,
            headers: userService.authorizationHearder(),
            method:'DELETE',
        });
    };
    this.getOrderNearby = function(postData){
        return $http({
            url:urlHeader+'order/nearby',
            headers: userService.authorizationHearder(),
            method:'POST',
            data:postData
        });
    };
    this.getOrderHistory = function (postData) {
        return $http({
            url:urlHeader+'order/history',
            headers: userService.authorizationHearder(),
            method:'POST',
            data:postData
        });
    };
    this.addOrder = function(order){
        return $http({
            url:urlHeader+'order',
            method:'POST',
            headers: userService.authorizationHearder(),
            data:{
                "description":order.description,
                "orgAddressId":order.orgAddress.addressId,
                "newDestAddress":order.newDestAddress,
                "destAddressId":order.destAddress.addressId,
                "destAddress":order.destAddress
            }
        })
    }
}]);
