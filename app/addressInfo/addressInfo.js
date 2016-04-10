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
                addressService.modifyAddress($scope.currentAddress,function(){
                    $scope.reLoad();
                    alert('修改成功！')
                },function(){
                    $scope.reLoad();
                });
            };
        };
        $scope.addAddress = function(address){
            $scope.currentAddress = address;
            $scope.saveFunc = function(){
                addressService.addAddress($scope.currentAddress,function(){
                    $scope.reLoad();
                    alert('新增成功！')
                });
            };
        };
        $scope.deleteAddress = function(address){
            addressService.deleteAddress(address,function(){
                $scope.reLoad();
                alert('删除成功！')
            });
        };

        //detail window
        $scope.calcelFunc = function(){
            $scope.currentAddress = null;
            $scope.saveCallBack = null;
        };

        //pageload
        $scope.reLoad = function(){
            addressService.fetchOrgAddresses(function(){
                $scope.addressInfo = addressService.orgAddresses;
                $scope.showAddRow  = !addressService.isOrgAddressesFull();
            });
        };
        $scope.reLoad();

    }]);