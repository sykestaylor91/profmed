var helper = require('../fixtures/helper');
var userExams = require('../fixtures/userExams');
var exams = require('../fixtures/exams');
var _ = require('lodash');

module.exports = {
  path: '/ExamService/userExam/create',
  method: 'POST',
  callback: function(req, res) {

    var exam = _.find(exams, {id: req.body.examId});

    var userExam = _.cloneDeep(exam);

    _.merge(userExam, {
      id: 'userExam-mock-id-1',
      status: 'open',
      userId: req.body.userId,
      attributes: {
        examId: req.body.examId,
        startTime: new Date(),
        endTime: new Date(Date.now() + 90000000)
      }
    });
    userExam = _.omit(userExam, ['title', 'releaseDate', 'examId']);

    var data = userExam;

    var body = helper.generateContainer('userExam', data);

    helper.sendResponse(req, res, body, 1000);
  }
}
