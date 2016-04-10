'use strict';

angular.module('myApp.login', ['ngRoute','myApp.userService',])
.controller('loginCtrl', ['$scope','$location','userService',function($scope,$location,userService) {
      $scope.submit = function(loginInfo) {
          var username = loginInfo.username;
          var password = loginInfo.password;
          $scope.userChangeHandle = function() {
              $scope.$emit('event.userChange');
          }
          userService.fetchUserInfo(username, password,function(){
              if (userService.isUserValid()) {
                  $scope.userChangeHandle();
                  if (userService.user.username === username && userService.user.role === 'ROLE_OWNER') {
                      $location.path('/order').search('username=' + userService.user.username).replace();
                      //if($scope.$$phase) $scope.$apply();
                  } else if (userService.user.username === username && userService.user.role === 'ROLE_DELIVERER') {
                      $location.path('/deliveryOrder').search('username=' + userService.user.username).replace();
                  }
              }
          });
      }
}])
