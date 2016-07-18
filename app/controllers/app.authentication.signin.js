(function () {

  'use strict';

  angular.module('app.authentication').controller('SigninController', SigninController);

  //Injecting Satellizer service to allow login action
  SigninController.$inject = ['$auth'];

  function SigninController($auth) {

    var vm = this;

    vm.actions = {
      signin: signin
    };

    function signin(email, password) {

      var user = {
        email: email,
        password: password
      };

      $auth.login(user).then(function (response) {
        //Here all code necessary after successful login
      }).catch(function (response) {
        //Here all code necessary when error was thrown
      });
    }
  }

})();
