var helper = require('../fixtures/helper');
var userExams = require('../fixtures/userExams');
var _ = require('lodash');

module.exports = {
  path: '/ExamService/userExam/resume',
  method: 'POST',
  callback: function(req, res) {

    var userExam = _.find(userExams, {id: req.body.id});

    var data = userExam;

    var body = helper.generateContainer('userExam', data);

    helper.sendResponse(req, res, body, 1000);
  }
}
