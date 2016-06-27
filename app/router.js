(function () {

  //Adding router configuration to main app module to may define all routes
  angular.module('app').config(routeMapper);

  //Injecting the main service providers
  routeMapper.$inject = ['$urlRouterProvider', '$stateProvider', '$locationProvider'];

  //Here define all app routes
  function routeMapper($urlRouterProvider, $stateProvider, $locationProvider) {

    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });

    $urlRouterProvider.otherwise('/');

    $stateProvider.state('index', {
      url: '/',
      templateUrl: 'templates/index.html'
    });
  }

})();
