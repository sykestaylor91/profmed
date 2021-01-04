(function() {
  'use strict';

  angular
    .module('app')
    .factory('UXSessionService', factory)
    .service('uXSessionService', service);

  /** @ngInject */
  function factory($log, configuration, $http, GenericDataService) {

    function UXSessionService() {
      $log.debug('UXSessionService factory');

      GenericDataService.apply(this, arguments);
      this.serviceUrl = [configuration.apiHost, configuration.profMedServiceURI, '/uxsession'].join('');
      this.dataAttribute = 'userExam';
      this.dataAttributePlural = 'userExams';
    }

    UXSessionService.prototype = Object.create(GenericDataService.prototype);

    return UXSessionService;

  }

  /** @ngInject */
  function service(UXSessionService) {
    return new UXSessionService();
  }

})();
