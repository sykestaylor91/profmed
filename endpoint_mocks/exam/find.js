var helper = require('../fixtures/helper');
var exams = require('../fixtures/exams');
var _ = require('lodash');

module.exports = {
  path: '/ProfMedService/exam/find',
  method: 'GET',
  callback: function(req, res) {

    var exam = _.find(exams, {id: req.query.id});

    var data = exam;

    var body = helper.generateContainer('exam', data);
    if(!exam) {
      body.status = 'failed';
      body.reason = 'not found';
    }
    helper.sendResponse(req, res, body, 1000);
  }
}
