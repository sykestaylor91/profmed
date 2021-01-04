(function() {
  'use strict';

  angular
    .module('app')
    .controller('ExamIntroController', ExamIntroController);

  /** @ngInject */
  function ExamIntroController($log, $state, $stateParams, profMedSessionService, examService, uXSessionService, userExamService, _, toastr) {
    $log.debug('ExamIntroController');

    var self = this;

    // TODO: init page size depending on userExam status
    // if no exam - start exam screen
    // OPTIONAL: if open && not paused - allow start without code (send hearbeat)
    // if pasued/locked - require proctor or one-time code

    self.lockScreen = false;
    self.isSecureExam = false;

    self.exam = {};
    self.userExam = {};

    if(!profMedSessionService.isSessionActive()) {
      return $state.go('home');
    }

    examService.find({id: $stateParams.examId})
      .then(function(data){
        self.exam = data;
        self.isSecureExam = data.attributes.programType == 'exam';

      })
      .catch(function(err){
        $log.debug('examService find error: ', err);
        toastr.error('This exam does not exist');
        $state.go('home');
      });


    uXSessionService.find({id: $stateParams.userExamId})
      .then(function(data){

        self.userExam = data;
        // set lock screen when user exam found
        self.lockScreen = true;

      })
      .catch(function(err){
        $log.debug('uXSessionService find error: ', err);
      });

    self.isLoading = function() {
      return examService.getActiveCount() + uXSessionService.getActiveCount() + userExamService.getActiveCount();
    }

    self.startExam = function() {
      // if no user exam then run start request, else run resume
      var params;
      var userId = profMedSessionService.getUser().id;

      if(!_.get(self.userExam, 'id')) {

        params = {
          userId: userId,
          examId: $stateParams.examId,
          passCode: _.get(self.formModel, 'passCode')
        };
        return userExamService.create(params)
          .then(function(data){
            // initiate useExam session delegate
            $state.go('examQuestion', {userExamId: data.id});
          })
          .catch(function(err){
            $log.debug('session create error: ', err);
            toastr.error('Session could not be started.');
          });
      }
      else {

        params = {
          id: $stateParams.userExamId,
          userId: userId,
          examId: $stateParams.examId,
          passCode: _.get(self.formModel, 'passCode')
        };
        return userExamService.resume(params)
          .then(function(data){
            // initiate useExam session delegate
            $state.go('examQuestion', {userExamId: data.id});
          })
          .catch(function(err){
            $log.debug('session resume error: ', err);
            toastr.error('Session could not be resumed.');
          });
      }


    };

  }
})();
