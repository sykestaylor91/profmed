// http://stackoverflow.com/questions/16286605/angularjs-initialize-service-with-asynchronous-data

(function() {
  'use strict';

  angular
    .module('app')
    .factory('portalSession', factory);

  /** @ngInject */
  function factory($log) {

    $log.debug('portalSession factory');

    // TODO: move this to a separate "service" angular service,
    var service = {
      getToken: getToken,
      getUser: getUser,
      start: start,
      end: end,
      isActive: isActive
    };

    return service;

    function getToken() {
      return sessionStorage.getItem('session.tokenPortal');
    }

    function start(data) {
      if(data.profmedToken) {
        sessionStorage.setItem('session.token', data.profmedToken);
      }
      if(data.token) {
        sessionStorage.setItem('session.tokenPortal', data.token);
      }
      sessionStorage.setItem('session.user', JSON.stringify(data));
    }

    function end() {
      sessionStorage.clear();
    }

    function isActive() {
      var token = sessionStorage.getItem('session.tokenPortal');
      return !!token;
    }

    function getUser() {
      var json = sessionStorage.getItem('session.user');
      if (json) {
        var user = JSON.parse(json);
        user.id = user.UUID;
        return user;
      }
    }

  }
})();
