var helper = require('../fixtures/helper');
var questions = require('../fixtures/questions');
var _ = require('lodash');

module.exports = {
  path: '/ProfMedService/question/find',
  method: 'GET',
  callback: function(req, res) {

    var question = _.find(questions, {id: req.query.id});

    var data = question;

    var body = helper.generateContainer('question', data);
    if(!question) {
      body.status = 'failed';
      body.reason = 'not found';
    }

    helper.sendResponse(req, res, body, 200);
  }
}
