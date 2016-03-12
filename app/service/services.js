/**
 * Created by Administrator on 2016/3/5.
 */
'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
var services = angular.module('myApp.service', ['ngResource']).
    value('version', '1.0');

services.factory('services', ['$resource', function ($resource) {
    return $resource('fakeData/userLogin.json', {}, {
        login: {method: 'GET', params: {}, isArray: false}
    });
}]);