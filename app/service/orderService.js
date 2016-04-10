/**
 * Created by Daniel on 2016/4/10.
 */
'use strict';

/* orderService */

var services = angular.module('myApp.orderService', ['ngResource']).
    value('version', '1.0');

services.service('orderService', ['$http','urlHeader',function ($http,urlHeader) {
    this.addOrder = function(order,successCallBack,errorCallback){
        $http({
            url:urlHeader+'order',
            method:'POST',
            data:{
                "description":order.description,
                "orgAddressId":order.orgAddress.addressId,
                "newDestAddress":order.newDestAddress,
                "destAddressId":order.destAddress.addressId,
                "destAddress":order.destAddress
            }
        })
        .success(function(){
            if(successCallBack){
                successCallBack();
            }
        })
        .error(function(){
            if(errorCallback){
                errorCallback();
            }
        });
    }
}]);
