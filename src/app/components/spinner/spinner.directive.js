(function() {
  'use strict';

  angular
    .module('app')
    .directive('spinner', spinner);

  /** @ngInject */
  function spinner() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/spinner/spinner.html'
    };

    return directive;
  }
})();
