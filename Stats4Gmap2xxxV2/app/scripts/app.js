'use strict';

/**
 * @ngdoc overview
 * @name stats4Gmap2xxxV2App
 * @description
 * # stats4Gmap2xxxV2App
 *
 * Main module of the application.
 */
var app = angular
  .module('stats4Gmap2xxxV2App', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/main', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/groupbyip', {
        templateUrl: 'views/groupbyip.html',
        controller: 'GroupByIpCtrl'
      })
      .when('/contact', {
        templateUrl: 'views/contact.html',
        controller: 'ContactCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
app.filter('limitFromLimitNb', function() {
    return function(items, begin, nb) {                                     
        return items.slice( begin, begin+nb);
    }
});
app.filter('decodeURIComponent', function($window) {
    return $window.decodeURIComponent;
});
