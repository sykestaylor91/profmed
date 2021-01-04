(function() {
  'use strict';

  angular
    .module('app')
    .run(runBlock);

  /** @ngInject */
  function runBlock($rootScope, $log, portalSession, profMedSessionService, userExamDelegate, $state, $timeout, configuration) {
    $log.debug('runBlock');

    if(portalSession.isActive()) {
      // TODO: can be broken down to separate function not to set event to null
      startSession(null, portalSession.getUser());
    }
    else {
      $log.debug('no session available, going to home');
      // TODO: save current state and params to be able to go back when sign in is done
      $timeout(function(){
        $state.go('home');
      });
    }

    $rootScope.$on('authenticationSuccessful', startSession);

    function startSession(event, data) {
      $log.debug('startSession', data, event);
      portalSession.start(data);
      profMedSessionService.validate();
      userExamDelegate.reset();
    }

    angular.element(document.body).addClass(['vendor-', configuration.vendor].join(''));

    if(configuration.vendor) {
      document.title =  configuration.vendor.toUpperCase();
    }

  }

})();
