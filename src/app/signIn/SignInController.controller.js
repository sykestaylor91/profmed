(function() {
  'use strict';

  angular
    .module('app')
    .controller('SignInController', SignInController);

  /** @ngInject */
  function SignInController($rootScope, $log, $state, configuration, portalSession, profMedSessionService, authenticationService, toastr) {
    $log.debug('SignInController');

    var self = this;
    // multi-step authentication
    self.multiStep = !!configuration.multiStep;
    self.passwordStep = false;

    self.formModel = {};

    if(portalSession.isActive()) {
      $log.info('session active, redirecting to home');
      return $state.go('home');
    }

    self.isLoading = function() {
      return authenticationService.getActiveCount();
    }

    self.signInAction = function() {
      $log.debug('signInAction');
      authenticationService.authenticate(self.formModel)
        .then(function(data) {
          $log.info('signInCallback', data);

          if (data.UUID) {
            self.passwordStep = true;
          } else {
            self.passwordStep = false;
          }

          if (data.authentication) {
            $rootScope.$broadcast('authenticationSuccessful', data);
            return $state.go('home');
          }
        })
        .catch(function(err){
          toastr.error('Authentication failed.');
          $log.warn('Sign-in error', err.name, err.message);
        });
    };

    self.stepBack = function() {
      self.passwordStep = false;
    };

  }
})();
