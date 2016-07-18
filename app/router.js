(function () {

  'use strict';

  //Adding router configuration to main app module to may define all routes
  angular.module('app').config(routeMapper);

  //Injecting the main service providers
  routeMapper.$inject = ['$urlRouterProvider', '$stateProvider', '$locationProvider'];

  //Here define all app routes
  function routeMapper($urlRouterProvider, $stateProvider, $locationProvider) {

    $locationProvider.html5Mode(true);

    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state({
        name: 'index',
        url: '/',
        templateUrl: 'templates/index.html'
      })
      .state({
        name: 'signin',
        url: '/signin',
        templateUrl: 'templates/signin.html',
        controller: 'SigninController',
        controllerAs: 'vm'
      });
  }

})();
