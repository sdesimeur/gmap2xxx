'use strict';

/**
 * @ngdoc function
 * @name stats4Gmap2xxxV2App.controller:GroupByIpCtrl
 * @description
 * # GroupByIpCtrl
 * Controller of the stats4Gmap2xxxV2App
 */
angular.module('stats4Gmap2xxxV2App')
  .controller('GroupByIpCtrl', function ($scope, $http) {
    $scope.nbQueryOneTime=100;
    $scope.orderProp='ndate';
    $scope.firstInPage=0;
    $scope.currentPage = 1;
    $scope.numPerPage = 20;
    $scope.maxSize = 5;
    $scope.reqs = [];
    $http({method: 'GET', url: "api/querysql/nbsidsgroupbyip/%20"
        }).then(function(data) {
            $scope.nbtotal = data.data[0]['COUNT(*)'];
            for (var i=0;i<$scope.nbtotal;i+=$scope.nbQueryOneTime){
                var url="api/querysql/idsgroupbyip/ORDER BY ndate DESC LIMIT "+$scope.nbQueryOneTime+" OFFSET "+i;
                $http({method: 'GET', url: url
                    }).then(function(data) {
                        data.data.forEach(function (onedata) {
                            $scope.reqs.push(onedata);
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
  });
