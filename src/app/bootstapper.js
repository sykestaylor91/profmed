// http://stackoverflow.com/questions/16286605/angularjs-initialize-service-with-asynchronous-data
(function() {
  var initInjector = angular.injector(['ng']);
  var $http = initInjector.get('$http');
  var $log = initInjector.get('$log');
  $log.debug('BOOTSTRAP: INIT');
  var bootstrapper = angular.module('bootstrapper', []);
  var deploymentConfig = {};
  bootstrapper.constant('deploymentConfig', deploymentConfig);
  $http.get('/ConfigurationService/configuration/deploymentConfig.json')
    .then(function(response) {
      $log.debug('BOOTSTRAP: CONFIG');
      if (response && response.data && response.data.configuration) {
        angular.merge(deploymentConfig, response.data.configuration)
      }
    })
    .finally(function() {
      $log.debug('BOOTSTRAP: READY');
      angular.element(document).ready(function() {
        $log.debug('BOOTSTRAP: START');
        angular.bootstrap(document, ['app']);
      });
    });
})();
