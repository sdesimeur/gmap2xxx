'use strict';

/**
 * @ngdoc function
 * @name stats4Gmap2xxxV2App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the stats4Gmap2xxxV2App
 */
angular.module('stats4Gmap2xxxV2App')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.nbQueryOneTime=100;
    $scope.orderProp='ndate';
    $scope.firstInPage=0;
    $scope.currentPage = 1;
    $scope.numPerPage = 20;
    $scope.maxSize = 5;
    $scope.trueOrFalse = function(val) {
        return (val===1)?'True':'False';
    };
    $scope.reqs = [];
    $scope.urls = [];
    $http({method: 'GET', url: "api/querysql/nbids/%20"
        }).then(function(data) {
            $scope.nbtotal = data.data[0]['COUNT(*)'];
            for (var i=0;i<$scope.nbtotal;i+=$scope.nbQueryOneTime){
                var url="api/querysql/ids/ORDER BY ndate DESC LIMIT "+$scope.nbQueryOneTime+" OFFSET "+i;
                $http({method: 'GET', url: url
                    }).then(function(data) {
                        var txtnxt="WHERE id4identities in (";
                        var tbids=[];
                        data.data.forEach(function (onedata) {
                            $scope.reqs.push(onedata);
                            tbids.push(onedata.id);
                        });
                        txtnxt+=tbids.join(',')+')';
                        var url="api/querysql/urls/"+txtnxt;
                        $http({method: 'GET', url: url
                            }).then(function(data) {
                                $scope.urls = data.data.concat($scope.urls);
                            }, function(data) {
                            });
                    }, function(data) {
                    });
            }
        }, function(data) {
        });
    $scope.pageChanged = function() {
        $scope.firstInPage = ($scope.currentPage-1)*$scope.numPerPage;
    };
//    $scope.$watch("reqs", function(newValue, oldValue) {
//        $scope.totalItems = newValue.length; 
//    });
//    $scope.totalItems=58;
    $scope.filterIsNull = function(p){
        if (p === null){
            p = {url: "", del1step: false, errorjson: false, errorjson2: false};
        }
        return p;
    };
  });
