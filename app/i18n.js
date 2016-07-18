(function () {

  'use strict';

  //Adding translation config
  angular.module('app').config(englishTranslations).config(spanishTranslations);

  //Injecting locale messages
  englishTranslations.$inject = ['$translateProvider', 'EN_MESSAGES', 'EN_ERROR_MESSAGES'];
  spanishTranslations.$inject = ['$translateProvider', 'ES_MESSAGES', 'ES_ERROR_MESSAGES'];

  function englishTranslations ($translateProvider, EN_MESSAGES, EN_ERROR_MESSAGES) {

    //Here put and if you want to set like a namespace to segment all messages
    var allMessages = {
      message: EN_MESSAGES,
      error: EN_ERROR_MESSAGES
    };

    $translateProvider.translations('en', allMessages);
  }

  function spanishTranslations($translateProvider, ES_MESSAGES, ES_ERROR_MESSAGES) {

    //Here put and if you want to set like a namespace to segment all messages
    var allMessages = {
      message: ES_MESSAGES,
      error: ES_ERROR_MESSAGES
    };

    $translateProvider.translations('es', allMessages);
    $translateProvider.preferredLanguage('es');
    $translateProvider.useLocalStorage();
    $translateProvider.useSanitizeValueStrategy('escape');
  }

})();
