(function() {
  'use strict';

  angular
    .module('app')
    .controller('ExamQuestionController', ExamQuestionController);

  /** @ngInject */
  function ExamQuestionController($scope, $log, $state, $stateParams, questionService, uXSessionService, userExamService, _, toastr, userExamDelegate, moment) {
    $log.debug('ExamQuestionController');

    var self = this;

    self.userExam = userExamDelegate.getUserExam();
    self.question = null;

    self.optionLabels = 'abcdefghijklmnopqrstuvwxyz'.split('');

    self.responses = _.range(1, 155);

    if( userExamDelegate.getUserExamId() !== $stateParams.userExamId) {
      initUserExam();
    }
    else if($stateParams.questionId){
      fetchCurrentQuestion();
    } else {
      $state.go($state.current, {questionId: userExamDelegate.getCurrentQuestionId()},  {reload: true});
    }

    self.isLoading = function() {
      return uXSessionService.getActiveCount() + questionService.getActiveCount() + userExamService.getActiveCount();
    }

    self.goToNextQuestion = function() {
      $state.go($state.current, {questionId: userExamDelegate.getNextQuestionId()}, {reload: true});
    };

    self.goToPreviousQuestion = function() {
      $state.go($state.current, {questionId: userExamDelegate.getPreviousQuestionId()}, {reload: true});
    };

    self.getTimeLeft = function() {
      if(!_.get(self.userExam, 'attributes.endTime')) {
        return null;
      }
      var endTime = moment(self.userExam.attributes.endTime);
      var remaining = moment.duration(endTime.diff());

      return [Math.floor(remaining.asHours()), 'h ', remaining.minutes(), 'min'].join('');
    }

    $scope.$watch(detectEliminated, unsetEliminated, true);

    function detectEliminated() {
      return self.eliminated;
    }

    function unsetEliminated () {
      if(_.get(self.eliminated, self.answerId)) {
        self.answerId = null;
      }
    }

    function initUserExam() {

      uXSessionService.find({id: $stateParams.userExamId})
        .then(function(data){

          userExamDelegate.setUserExam(data);
          $state.go($state.current, {questionId: userExamDelegate.getCurrentQuestionId()},  {reload: true});

        })
        .catch(function(err){
          $log.debug('session initiation error: ', err);
          toastr.error('Session could not be initiated.');

          $state.go('examIntro', $stateParams);


        });
    }

    function fetchCurrentQuestion() {

      questionService.find({id: $stateParams.questionId})
        .then(function(data){

          userExamDelegate.putQuestion(data);

          userExamDelegate.setCurrentQuestionById(data.id);

          self.question = userExamDelegate.getCurrentQuestion();

        })
        .catch(function(err){
          $log.debug('question find error: ', err);
          toastr.error('Question could not be displayed.');
        });
      }
    }

})();
