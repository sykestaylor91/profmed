(function() {
  'use strict';

  angular
    .module('app')
    .controller('ExamListController', ExamListController);

  /** @ngInject */
  function ExamListController($scope, $log, $state, profMedSessionService, examService, uXSessionService, _, examListDelegate) {
    $log.debug('ExamListController');

    var self = this;

    self.exams = [];
    self.userExams = [];
    self.examsToDisplay = [];

    if(!profMedSessionService.isSessionActive()) {
      return $state.go('home');
    }
      examService.query({}).then(function(data){
            self.exams = data;
    });

    var userId = profMedSessionService.getUser().id;

        uXSessionService.query({userId: userId}).then(function(data){
            self.userExams = data;
    }); // TODO: handle errors via '.catch'

    self.goToExam = function(examId, userExamId){
      $log.debug('goToExam', examId, userExamId);
      $state.go('examIntro', {
        examId: examId,
        userExamId: userExamId
      });
    };

    self.isLoading = function() {
      return examService.getActiveCount() + uXSessionService.getActiveCount();
    }

    $scope.$watch(detectExamChange, updateExamsToDisplay, true);

    function detectExamChange() {
      return {
        exams: self.exams,
        userExams: self.userExams
      };
    }

    function updateExamsToDisplay() {
      self.examsToDisplay = _.map(self.exams, function(exam){

        var child = examListDelegate.getExamChild(self.exams, exam);
        var parent = _.find(self.exams, {id:exam.attributes.parent});
        var userExam = _.find(self.userExams, {attributes: {examId: exam.id}});
        var childId = _.get(child, 'id');
        var parentId = _.get(parent, 'id');
        var userExamId = _.get(userExam, 'id');
        var rank = examListDelegate.countNestedChildren(self.exams, exam);
        var available = examListDelegate.checkIfExamAvailable(self.exams, self.userExams, exam);
        var status = _.get(userExam, 'status');

        return {
          id: exam.id,
          title: exam.title,
          parentId: parentId,
          childId: childId,
          rank: rank,
          available: available,
          userExamId: userExamId,
          status: status
        };
      });
    }
  }
})();
