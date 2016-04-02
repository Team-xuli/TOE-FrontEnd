'use strict';

angular.module('myApp.register', ['ngRoute'])
.controller('registerCtrl', ['$scope','$http','urlHeader',function($scope,$http,urlHeader) {
      $scope.roleList=[
        {
          "roleName":"ROLE_OWNER"
        },{
          "roleName":"ROLE_DELIVERER"
        }
      ];
      $scope.register = function(registerInfo){
        var username= registerInfo.username;
        var password = registerInfo.password;
        var role = registerInfo.currentRole.roleName;
        var loginRequest = $http({
          url:urlHeader+'signup',
          //headers: {
          //  'Authorization': 'Basic ' + btoa(email + ':' + password)
          //},//mockdata/login.json   192.68.1.9:7777/user/passport http://192.168.1.2:7777/hello
          //headers: {
          //  'Authorization': 'Basic ' + btoa('admin' + ':' + 'admin')
          //},
          method:'POST',
          data:{
            "username":username,
            "password":password,
            "role":role
          }
        })
            .success(function(loginData){
              alert('注册成功！！')
            })
            .error(function(loginData){
              alert('注册失败！！')
            })
      }
}]);