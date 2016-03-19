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
        var username= loginInfo.username;
        var password = loginInfo.password;
        var loginRequest = $http({
          url:'http://192.168.1.3:7777/user',
          //headers: {
          //  'Authorization': 'Basic ' + btoa(email + ':' + password)
          //},//mockdata/login.json   192.68.1.9:7777/user/passport
          headers: {
            'Authorization': 'Basic ' + btoa(username + ':' + password)
          },
          method:'GET',
        })
            .success(function(loginData){
                console.log(loginData);
                if(loginData.username === username ){
                  $location.path('/ticket').search('username='+loginData.username).replace();
                  if($scope.$$phase) $scope.$apply();
                }
            })
            .error(function(loginData){
                alert('请检查用户名和密码！！！')
            })
      }


}])

//success:function(data){
//  if(data.status == "success"){
//    //alert("登录成功！！");
//    //$location.path('/ticket');
//    //$window.location.href('/ticket');
//    $location.path('/ticket').search('username='+data.username).replace();
//    if(!$scope.$$phase) $scope.$apply()
//    //$location.replace();
//    //$state.go('ticket',{},{reload:true});
//  }else{
//    alert(data.msg);
//  }
//};