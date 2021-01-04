(function() {
  'use strict';

  angular
    .module('app')
    .factory('UserExamService', factory)
    .service('userExamService', service);

  /** @ngInject */
  function factory($log, configuration, $http, GenericDataService, profMedSessionService) {

    function UserExamService() {
      $log.debug('UserExamService factory');

      GenericDataService.apply(this, arguments);
      this.serviceUrl = [configuration.apiHost, configuration.examServiceURI, '/userExam'].join('');
      this.dataAttribute = 'userExam';
    }

    UserExamService.prototype = Object.create(GenericDataService.prototype);

    UserExamService.prototype.getSessionParameters = function() {
      return {
        userSessionToken: profMedSessionService.getToken()
      };
    };

    UserExamService.prototype.create = function(params) {
      return this.post('/create', params);
    };

    UserExamService.prototype.resume = function(params) {
      return this.post('/resume', params);
    };

    UserExamService.prototype.update = function(params) {
      return this.post('/update', params);
    };

    UserExamService.prototype.heartbeat = function(params) {
      return this.post('/heartbeat', params);
    };

    UserExamService.prototype.lock = function(params) {
      return this.post('/lock', params);
    };

    return UserExamService;

  }

  /** @ngInject */
  function service(UserExamService) {
    return new UserExamService();
  }

})();
