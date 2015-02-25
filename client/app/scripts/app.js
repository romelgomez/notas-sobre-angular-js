'use strict';

/**
 * @ngdoc overview
 * @name notasSobreAngularJs2App
 * @description
 * # notasSobreAngularJs2App
 *
 * Main module of the application.
 */
angular
  .module('notasSobreAngularJs2App', [
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
