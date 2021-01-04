(function() {
  'use strict';

  angular
    .module('app')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($log, $state, portalSession) {
    $log.debug('MainController');

    if(!portalSession.isActive()) {
      $state.go('signIn');
    }
    else {
      $log.info('MainController: session active, redirecting to examList');
      $state.go('examList');
    }
  }
})();
