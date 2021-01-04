(function() {
  'use strict';

  angular
    .module('app')
    .directive('showFocus', showFocus);

  /** @ngInject */
  function showFocus($timeout/*, $log*/) {
    return function(scope, element, attrs) {
        scope.$watch(attrs.showFocus,
            function(newValue) {
                $timeout(function() {
                    if(newValue){
                        element.focus();
                    }
                });
            }, true);
    };
  }
})();
