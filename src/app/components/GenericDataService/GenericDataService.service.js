// http://stackoverflow.com/questions/16286605/angularjs-initialize-service-with-asynchronous-data

(function() {
  'use strict';

  angular
    .module('app')
    .factory('GenericDataService', factory)
    .service('genericDataService', service);

  /** @ngInject */
  function factory($log, $http, configuration, profMedSessionService, portalSession, _, $q) {
    function GenericDataService() {
      $log.debug('GenericDataService factory');
      // INFO: GenericDataService.apply(this, arguments); <- this is how to inherit constructor
      this.serviceUrl = [configuration.apiHost, configuration.genericServiceURI, '/generic'].join('');
      this.dataAttribute = 'generic';
      this.dataAttributePlural = null;
      this.activeCount = 0;
    }

    // INFO: ExamPerformanceService.prototype = Object.create(GenericDataService.prototype); <- this is how to inherit methods

    GenericDataService.prototype.getActiveCount = function() {
      return this.activeCount;
    }

    // support for ProfMedService data attributes
    GenericDataService.prototype.getDataAttributePlural = function() {
      return this.dataAttributePlural || this.dataAttribute;
    };

    GenericDataService.prototype.getSessionParameters = function() {
      return {
        userSessionToken: profMedSessionService.getToken(),
        token: portalSession.getToken()
      };
    };

    GenericDataService.prototype.querySuccessHandler = function(response) {
      this.activeCount--;
      $log.debug('defaultSuccessHandler', response);
      if (response.data.status != 'ok') {
        return $q.reject(response.data.reason);
      }
      return $q.resolve(response.data[this.getDataAttributePlural()]);
    };

    GenericDataService.prototype.defaultSuccessHandler = function(response) {
      this.activeCount--;
      $log.debug('defaultSuccessHandler', response);
      if (response.data.status != 'ok') {
        return $q.reject(response.data.reason);
      }
      return $q.resolve(response.data[this.dataAttribute]);
    };

    GenericDataService.prototype.defaultFailedHandler = function(response) {
      this.activeCount--;
      $log.debug('defaultFailedHandler', response);
      return $q.reject(response.data);
    };

    GenericDataService.prototype.query = function(params) {
      this.activeCount++;
      var queryParams = angular.extend(this.getSessionParameters(), params);

      return $http({
        method: 'GET',
        url: this.serviceUrl + '/query',
        params: queryParams
      })
        .then(this.querySuccessHandler.bind(this), this.defaultFailedHandler.bind(this));
    };

    GenericDataService.prototype.find = function(params) {
      return this.get('/find', params);
    };

    GenericDataService.prototype.get = function(verb, params) {
      this.activeCount++;
      var queryParams = angular.extend(this.getSessionParameters(), params);

      return $http({
        method: 'GET',
        url: this.serviceUrl + verb,
        params: queryParams
      })
        .then(this.defaultSuccessHandler.bind(this), this.defaultFailedHandler.bind(this));
    };

    GenericDataService.prototype.post = function(verb, params) {
      this.activeCount++;
      var requestData = angular.extend(this.getSessionParameters(), params);

      return $http({
        method: 'POST',
        url: this.serviceUrl + verb,
        data: requestData
      })
        .then(this.defaultSuccessHandler.bind(this), this.defaultFailedHandler.bind(this));
    };
    return GenericDataService;
  }

  /** @ngInject */
  function service(GenericDataService) {
    return new GenericDataService();
  }

})();
