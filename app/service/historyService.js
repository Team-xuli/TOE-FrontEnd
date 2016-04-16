/**
 * Created by Administrator on 2016/4/16.
 */

'use strict';

/* orderService */

var services = angular.module('myApp.historyService', ['ngResource']).
    value('version', '1.0');

services.service('historyService', ['$http','urlHeader',function ($http,urlHeader) {
    var list = function (postData) {
        return $http.post(urlHeader+'order/history', postData);
    }

    return {
        list: function (postData) {
            return list(postData);
        }
    }
}]);