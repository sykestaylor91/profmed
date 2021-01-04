// http://stackoverflow.com/questions/24200909/apply-loading-spinner-during-ui-router-resolve
(function() {
  'use strict';

  angular
    .module('app')
    .directive('resolveLoader', resolveLoader);

  /** @ngInject */
  function resolveLoader($rootScope, $timeout) {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'app/components/resolveLoader/resolveLoader.html',
      link: function(scope, element) {

        $rootScope.$on('$stateChangeStart', function(event, currentRoute, previousRoute) {
          if (previousRoute) return;

          $timeout(function() {
            element.removeClass('ng-hide');
          });
        });

        $rootScope.$on('$stateChangeSuccess', function() {
          element.addClass('ng-hide');
        });
      }
    };
  }
})();
