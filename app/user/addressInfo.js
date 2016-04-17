/**
 * Created by Daniel on 2016/4/9.
 */

'use strict';

angular.module('myApp.addressInfo', ['ngRoute'])
    .controller('addressInfoCtrl', ['$scope','$location','addressService',function($scope,$location,addressService) {
        //main window
        $scope.addressInfo = [];
        $scope.showAddRow = true;
        //detail window
        $scope.currentAddress = null;
        $scope.saveFunc = null;

        $scope.modifyAddress = function(address){
            $scope.currentAddress = new Object(address) ;
            $scope.saveFunc = function(){
                addressService.modifyAddress($scope.currentAddress)
                    .success(function(){
                        $scope.reLoad();
                        alert('修改成功！')
                    }).error(function(res){
                        $scope.reLoad();
                        alert('修改失败:'+ res.message);
                    });
            };
        };
        $scope.addAddress = function(address){
            $scope.currentAddress = address;
            $scope.saveFunc = function(){
                addressService.addAddress($scope.currentAddress)
                    .success(function(){
                        $scope.reLoad();
                        alert('新增成功！')
                    }).error(function(res){
                        $scope.reLoad();
                        alert('新增失败:'+ res.message);
                    });
            };
        };
        $scope.deleteAddress = function(address){
            addressService.deleteAddress(address)
                .success(function(){
                    $scope.reLoad();
                    alert('删除成功！')
                }).error(function(res){
                    $scope.reLoad();
                    alert('删除失败:'+ res.message);
                });
        };

        //detail window
        $scope.calcelFunc = function(){
            $scope.currentAddress = null;
            $scope.saveCallBack = null;
        };

        //pageload
        $scope.reLoad = function(){
            addressService.fetchOrgAddresses()
                .success(
                    function(){
                        $scope.addressInfo = addressService.orgAddresses;
                        $scope.showAddRow  = !addressService.isOrgAddressesFull();
                    }
                ).error(function(res){
                    alert("获取源地址失败：" + res.message);
                })
        };
        $scope.reLoad();

    }]);