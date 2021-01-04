// http://stackoverflow.com/questions/16286605/angularjs-initialize-service-with-asynchronous-data

(function() {
  'use strict';

  angular
    .module('app')
    .factory('profMedSessionService', factory);

  /** @ngInject */
  function factory($log, $http, $q, configuration) {
    $log.debug('profMedSessionService factory');

    var baseUri = [configuration.apiHost, configuration.profMedServiceURI].join('');
    var user = null;
    var deferred = $q.defer();

    // TODO: move this to a separate "service" angular service,
    var service = {
      readyPromise: deferred.promise,
      getToken: getToken,
      getUser: getUser,
      validate: validate,
      isSessionActive: isSessionActive
    };

    return service;

    function validate() {
      $log.debug('validate');

      var httpPromise = $http.post(baseUri+'/user/authenticate', {'token': getToken()})
        .then(function(request) {
          $log.debug('User session authorisation success');
          user = request.data.user;
          if(user) {
            deferred.resolve();
          }
          else {
            deferred.reject();
          }
        })
        .catch(function() {
          $log.warn('User session authorisation failed');
          user = {};
          deferred.reject();
        });

      return httpPromise;
    }

    function getUser() {
      return user;
    }

    function getToken() {
      return sessionStorage.getItem('session.token');
    }

    function isSessionActive() {
      var token = sessionStorage.getItem('session.token');
      return !!token && user;
    }

  }
})();
