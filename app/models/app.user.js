(function () {

  'use strict';

  angular.module('app').factory('User', user);

  user.$inject = ['restmod'];

  function user (restmod) {

    return restmod.model('/users');
  }

})();
