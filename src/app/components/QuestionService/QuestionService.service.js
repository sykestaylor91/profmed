(function() {
  'use strict';

  angular
    .module('app')
    .factory('QuestionService', factory)
    .service('questionService', service);

  /** @ngInject */
  function factory($log, configuration, $http, GenericDataService) {

    function QuestionService() {
      $log.debug('QuestionService factory');

      GenericDataService.apply(this, arguments);
      this.serviceUrl = [configuration.apiHost, configuration.profMedServiceURI, '/question'].join('');
      this.dataAttribute = 'question';
      this.dataAttributePlural = 'questions';
    }

    QuestionService.prototype = Object.create(GenericDataService.prototype);

    return QuestionService;

  }

  /** @ngInject */
  function service(QuestionService) {
    return new QuestionService();
  }

})();
