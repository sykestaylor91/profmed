(function() {
  'use strict';

  angular
    .module('app')
    .factory('UserExamDelegate', factory)
    .service('userExamDelegate', service);

  /** @ngInject */
  function factory($log, configuration, _, CryptoJS) {

    function UserExamDelegate() {
      $log.debug('UserExamDelegate factory');

      this.userExam = null;
      this.questions = [];
      this.responses = [];
      this.currentQuestionIndex = null;

    }

    UserExamDelegate.prototype.getQuestionIndex = function(question){
      var questionsIds = _.get(this.userExam, 'attributes.questions');
      return _.findIndex(questionsIds, question.id);
    };

    UserExamDelegate.prototype.decodeQuestion = function(question){
      // TODO decode
      return question;
    };

    UserExamDelegate.prototype.putQuestion = function(question){
      // replace a question in the array
      // this.questions.push(question);
      // this.questions = _.sortBy(this.questions, this.getQuestionIndex.bind(this));

      // find index and replace

      var index = _.findIndex(this.questions, {id: question.id});

      var questionClone = _.cloneDeep(question);

      if(_.isString(_.get(question.attributes.answers, 0))) {
        // answer is encoded if its a string instead of object
        questionClone.attributes.answers = this.decodeAnswers(questionClone.attributes.answers);
      }

      $log.debug('putQuestion', questionClone);

      this.questions[index] = questionClone;

    };

    UserExamDelegate.prototype.putResponse = function(){

    };

    UserExamDelegate.prototype.decodeAnswers = function(answers) {
      var phraseArray = ['w', 't', 'f', 'n', 'k', 's'];
      return _.map(answers, function(answer){
        var decrypted = CryptoJS.AES.decrypt(answer, [phraseArray[5], phraseArray[1], phraseArray[3], phraseArray[2], phraseArray[0], phraseArray[4]].join('')).toString(CryptoJS.enc.Utf8);
        return JSON.parse(decrypted);
      });
    };

    UserExamDelegate.prototype.setCurrentQuestionById = function(questionId){
      return this.currentQuestionIndex = _.findIndex(this.questions, {id:questionId});
    };

    UserExamDelegate.prototype.getCurrentQuestion = function(){
      return _.get(this.questions, [this.currentQuestionIndex]);
    };

    UserExamDelegate.prototype.getCurrentQuestionId = function(){
      return _.get(this.questions, [this.currentQuestionIndex, 'id']);
    };

    UserExamDelegate.prototype.getNextQuestionId = function(){
      // TODO: find index and increment, set to null if current is final question
      return this.currentQuestionId;
    };

    UserExamDelegate.prototype.getPreviousQuestionId = function(){
      // TODO: find index and increment, set to null if current is first question
      return this.currentQuestionId;
    };

    UserExamDelegate.prototype.setUserExam = function(userExam){
      this.reset();
      this.userExam = userExam;
      this.currentQuestionIndex = 0; // TODO: api should provide lastAnsweredQuestionId

      this.questions = _.map(userExam.attributes.questions, function(questionId){
        return {id: questionId};
      });
    };

    UserExamDelegate.prototype.getUserExamId = function(){
      return this.userExam ? this.userExam.id : null;
    };

    UserExamDelegate.prototype.getUserExam = function(){
      return this.userExam;
    };

    UserExamDelegate.prototype.reset = function(){
      return UserExamDelegate.call(this);
    };

    return UserExamDelegate;

  }

  /** @ngInject */
  function service(UserExamDelegate) {
    return new UserExamDelegate();
  }

})();
