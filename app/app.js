(function () {

  'use strict';

  //Main module named 'app' with its module dependencies
  angular.module('app', ['ui.router', 'restmod', 'satellizer']).config(restmodAdapter).config(satellizerAdapter);

  //Injecting service dependencies
  restmodAdapter.$inject = ['restmodProvider'];
  satellizerAdapter.$inject = ['$authProvider'];

  //Restmod configuration for models representation like ORM
  function restmodAdapter (restmodProvider) {

    restmodProvider.rebase({
      $config: {
        urlPrefix: 'http://localhost/api/v1',
        style: 'APIStyle'
      },
      $extend: {
        Model: {
          encodeUrlName: function (_name) {
            return _name.toLowerCase();
          }
        }
      }
    });
  }

  //Satellizer configuration for user authentication using JWT
  function satellizerAdapter ($authProvider) {

    $authProvider.loginUrl = 'http://localhost/api/v1/signin';
    $authProvider.signupUrl = 'http://localhost/api/v1/signup';
    $authProvider.tokenName = 'token';
    $authProvider.tokenPrefix = 'app';
  }

})();
