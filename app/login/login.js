'use strict';

angular.module('myApp.login', ['ngRoute'])
.controller('loginCtrl', ['$scope','$location','$window','$http','urlHeader',function($scope,$location,$window,$http,urlHeader) {
      //$scope.loginStep = function(userDetails){
      //  $scope.message = userDetails.email + userDetails.password;
      //
      //}
      //$scope.message = "Ready"
      $scope.submit = function(loginInfo){
        var username= loginInfo.username;
        var password = loginInfo.password;
        var loginRequest = $http({
          url:urlHeader+'user',
          //urlHeader+'signin',
          //header:{
          //  'Content-Type':undefined
          //},
          //transformRequest: function( ) {
          //  var formData = new FormData();
          //  formData.append('username', username);
          //  formData.append('password',password);
          //  return formData;
          //},
          headers: {
            'Authorization': 'Basic ' + btoa(username + ':' + password)
          },//mockdata/login.json   192.68.1.9:7777/user/passport http://192.168.1.2:7777/hello
          method:'GET',
          //dataType:'JSON',
        })
            .success(function(loginData){
                if(loginData.username === username && loginData.role===  'ROLE_OWNER'){
                    $location.path('/ticket').search('username='+loginData.username).replace();
                    //if($scope.$$phase) $scope.$apply();
                }else if(loginData.username === username && loginData.role===  'ROLE_DELIVERER'){
                    $location.path('/deliveryOrder').search('username='+loginData.username).replace();
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