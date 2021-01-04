(function() {
  'use strict';

  angular
    .module('app')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {

    // require session to be ready before initiating some controllers
    var resolveSession = {
      /** @ngInject */
      session: function(profMedSessionService) {
        return profMedSessionService.readyPromise;
      }
    }

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'mainController'
      })
      .state('examList', {
        url: '/examList',
        templateUrl: 'app/examList/examList.html',
        controller: 'ExamListController',
        controllerAs: 'examListController',
        resolve: resolveSession
      })
      .state('examIntro', {
        url: '/examIntro?:examId&:userExamId',
        params: {'examId':'', 'userExamId':''},
        templateUrl: 'app/examIntro/examIntro.html',
        controller: 'ExamIntroController',
        controllerAs: 'examIntroController',
        resolve: resolveSession
      })
      .state('examQuestion', {
        url: '/examQuestion?:userExamId&:questionId',
        params: {'userExamId':'', 'questionId':''},
        templateUrl: 'app/examQuestion/examQuestion.html',
        controller: 'ExamQuestionController',
        controllerAs: 'examQuestionController',
        resolve: resolveSession
      })
      .state('signIn', {
        url: '/signIn',
        templateUrl: 'app/signIn/signIn.html',
        controller: 'SignInController',
        controllerAs: 'signInController'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
