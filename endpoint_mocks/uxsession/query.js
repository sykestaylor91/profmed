var helper = require('../fixtures/helper');
var userExams = require('../fixtures/userExams');

module.exports = {
  path: '/ProfMedService/uxsession/query',
  method: 'GET',
  callback: function(req, res) {

    var data = userExams;

    var body = helper.generateContainer('userExams', data);

    helper.sendResponse(req, res, body, 1000);
  }
}
