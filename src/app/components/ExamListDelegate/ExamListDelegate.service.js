(function() {
  'use strict';

  angular
    .module('app')
    .factory('ExamListDelegate', factory)
    .service('examListDelegate', service);

  /** @ngInject */
  function factory($log, _) {

    function ExamListDelegate() {
      $log.debug('ExamListDelegate factory');

    }

    ExamListDelegate.prototype.getExamChild = function(exams, targetExam) {
        var child = null;
        exams.forEach(function(exam){
            if(targetExam.id === exam.attributes.parent) {
                child = exam;
            }
        });
        return child;
    };

    ExamListDelegate.prototype.countNestedChildren = function(exams, exam) {
        var count = 0;
        var child = exam;
        while(child) {
            child = this.getExamChild(exams, child);
            if(child) {
                count++;
            }
        }
        return count;
    };

    ExamListDelegate.prototype.checkIfExamStatusInList = function(userExams, exam, statusList) {
        var inList = false;
        userExams.forEach(function(userExam){
            if(userExam.attributes.examId === exam.id) {
                if (_.contains(statusList, userExam.status)) {
                    inList = true;
                }
            }
        });

        return inList;
    };

    ExamListDelegate.prototype.checkIfExamEverCompleted = function(userExams, exam) {
        return this.checkIfExamStatusInList(userExams, exam, ['closed', 'timed out']);
    };

    ExamListDelegate.prototype.checkIfExamAvailable = function(exams, userExams, exam) {
        // if open
        if(this.checkIfExamStatusInList(userExams, exam, ['open'])) {
          return true;
        }

        if(!this.checkIfExamEverCompleted(userExams, exam)) {

          var child = this.getExamChild(exams, exam);

          if(!child) {
              return true;
          }
          // if previous(child) exam has been completed
          if (this.checkIfExamEverCompleted(userExams, child)) {
              return true;
          }
        }


        return false;
    };


    return ExamListDelegate;

  }

  /** @ngInject */
  function service(ExamListDelegate) {
    return new ExamListDelegate();
  }

})();
