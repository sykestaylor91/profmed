
(function() {
  'use strict';

  angular
    .module('app')
    .factory('configuration', configuration);

  /** @ngInject */
  function configuration($log, $location, deploymentConfig, _) {

    var service = {};
    if(deploymentConfig) {
      // carry over all config params
      angular.merge(service, deploymentConfig);
    }

    // explicitly set defaults if parameters not defined
    _.defaults(service, {
      apiHost: [$location.$$protocol, '://', $location.$$host, ':3030'].join(''), // mock api
      portalServiceV2URI: '/PortalServiceV2',
      profMedServiceURI: '/ProfMedService',
      examServiceURI: '/ExamService',
      vendor: 'acog'
    });

    Object.freeze(service);
    return service;
  }
})();
