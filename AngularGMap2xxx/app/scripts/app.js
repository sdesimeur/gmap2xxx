'use strict';

/**
 * @ngdoc overview
 * @name angularGmap2xxxApp
 * @description
 * # angularGmap2xxxApp
 *
 * Main module of the application.
 */
angular
  .module('angularGmap2xxxApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
