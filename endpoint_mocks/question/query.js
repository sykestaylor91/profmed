var helper = require('../fixtures/helper');
var questions = require('../fixtures/questions');

module.exports = {
  path: '/ProfMedService/question/query',
  method: 'GET',
  callback: function(req, res) {

    var data = questions;

    var body = helper.generateContainer('questions', data);

    helper.sendResponse(req, res, body, 1000);
  }
}
