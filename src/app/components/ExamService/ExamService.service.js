(function() {
  'use strict';

  angular
    .module('app')
    .factory('ExamService', factory)
    .service('examService', service);

  /** @ngInject */
  function factory($log, configuration, $http, GenericDataService) {

    var ExamService = function() {
      $log.debug('ExamService factory');

      GenericDataService.apply(this, arguments);
      this.serviceUrl = [configuration.apiHost, configuration.profMedServiceURI, '/exam'].join('');
      this.dataAttribute = 'exam';
      this.dataAttributePlural = 'exams';
    };

    ExamService.prototype = Object.create(GenericDataService.prototype);

    return ExamService;

  }

  /** @ngInject */
  function service(ExamService) {
    return new ExamService();
  }

})();
