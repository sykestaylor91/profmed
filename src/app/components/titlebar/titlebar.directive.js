(function() {
  'use strict';

  angular
    .module('app')
    .directive('titlebar', titlebar);

  /** @ngInject */
  function titlebar() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/titlebar/titlebar.html',
      link: link
    };

    return directive;

    function link(scope, element, attrs) {
      scope.title = attrs.title;
    }
  }
})();
