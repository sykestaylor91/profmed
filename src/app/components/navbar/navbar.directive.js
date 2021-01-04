(function() {
  'use strict';

  angular
    .module('app')
    .directive('navbar', navbar);

  /** @ngInject */
  function navbar() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/navbar/navbar.html',
      controller: NavbarController,
      controllerAs: 'navbar',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function NavbarController($rootScope, $scope, $log, $location, portalSession, $state) {

      function signOut() {
        portalSession.end();
        $state.go('home');
      }

      $scope.isSessionTerminated = function() {
        return !portalSession.isActive();
      };

      $scope.isSessionActive = function() {
        return portalSession.isActive();
      };

      $scope.buttons = [{
        title: "Home",
        click: $state.go.bind($state, 'home'),
        class: "flaticon stroke home",
        right: true
      }, {
        title: "Log in",
        click: $state.go.bind($state, 'signIn'),
        hide: $scope.isSessionActive,
        right: true,
        class: "flaticon stroke logout"
      }, {
        title: "Log out",
        click: signOut,
        hide: $scope.isSessionTerminated,
        right: true,
        class: "flaticon stroke logout"
      }];
    }
  }

})();
