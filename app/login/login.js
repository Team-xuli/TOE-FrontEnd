'use strict';

angular.module('myApp.login', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'login/login.html',
    controller: 'loginCtrl'
  });
}])

.controller('loginCtrl', ['$scope','$location','$window','$http',function($scope,$location,$window,$http) {
      //$scope.loginStep = function(userDetails){
      //  $scope.message = userDetails.email + userDetails.password;
      //
      //}
      //$scope.message = "Ready"
      $scope.submit = function(loginInfo){
        var email= loginInfo.email;
        var password = loginInfo.password;
        var loginRequest = $.ajax({
          url:'mockdata/login.json',
          //headers: {
          //  'Authorization': 'Basic ' + btoa(email + ':' + password)
          //},//mockdata/login.json   192.68.1.9:7777/user/passport
          data:{
            email:email,
            password:password
          },
          dataType:'json',
          type:'GET',
          crossDomain:true,
          success:function(data){
            if(data.status == "success"){
              //alert("登录成功！！");
              //$location.path('/ticket');
              //$window.location.href('/ticket');
              $location.path('/ticket').search('username='+data.username).replace();
              if(!$scope.$$phase) $scope.$apply()
              //$location.replace();
              //$state.go('ticket',{},{reload:true});
            }else{
              alert(data.msg);
            }
          }
        });
      }


}]);