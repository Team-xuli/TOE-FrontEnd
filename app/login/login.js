'use strict';

angular.module('myApp.login', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'login/login.html',
    controller: 'loginCtrl'
  });
}])

.controller('loginCtrl', ['$scope',function($scope) {
      //$scope.loginStep = function(userDetails){
      //  $scope.message = userDetails.email + userDetails.password;
      //
      //}
      //$scope.message = "Ready"
      $scope.submit = function(loginInfo){
        var email= loginInfo.email;
        var password = loginInfo.password;
        var loginRequest = $.ajax({
          url:'192.168.1.4:7777',
          data:{
            email:email,
            password:password
          },
          type:"post",
          dataType:"json",
          success:function(data){
            if(data.msg == "true"){
              alert("µÇÂ½³É¹¦£¡£¡");
            }else{
              alert(data.msg);
            }
          }
        });
      }


}]);