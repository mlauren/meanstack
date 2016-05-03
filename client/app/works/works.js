'use strict';

angular.module('portfolioApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('works', {
        url: '/works',
        template: '<works></works>'
      });
  });
