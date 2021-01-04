var helper = require('../fixtures/helper');
var exams = require('../fixtures/exams');

module.exports = {
  path: '/ProfMedService/exam/query',
  method: 'GET',
  callback: function(req, res) {

    var data = exams;

    var body = helper.generateContainer('exams', data);

    helper.sendResponse(req, res, body, 1000);
  }
}
