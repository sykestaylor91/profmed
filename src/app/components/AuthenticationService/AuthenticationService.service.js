(function() {
  'use strict';

  angular
    .module('app')
    .factory('AuthenticationService', factory)
    .service('authenticationService', service);

  /** @ngInject */
  function factory($log, configuration, $http, GenericDataService) {

    function AuthenticationService() {
      $log.debug('AuthenticationService factory');

      GenericDataService.apply(this, arguments);
      this.serviceUrl = [configuration.apiHost, configuration.portalServiceV2URI, '/registration'].join('');
      this.dataAttribute = 'user';
    }

    AuthenticationService.prototype = Object.create(GenericDataService.prototype);

    AuthenticationService.prototype.authenticate = function(params) {
      this.activeCount++;
      var requestData = angular.copy(params);

      return $http({
        method: 'POST',
        url: this.serviceUrl + '/authenticate',
        data: requestData
      })
        .then(this.defaultSuccessHandler.bind(this), this.defaultFailedHandler.bind(this));
    };

    return AuthenticationService;

  }

  /** @ngInject */
  function service(AuthenticationService) {
    return new AuthenticationService();
  }

})();
