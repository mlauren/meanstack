'use strict';

angular.module('portfolioApp', [
  'portfolioApp.auth',
  'portfolioApp.admin',
  'portfolioApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngAnimate',
  'ngFileUpload',
  'btford.socket-io',
  'ui.router',
  'ui.bootstrap',
  'validation.match',
  'mgcrea.ngStrap'
])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  });
