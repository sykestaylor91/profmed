var helper = require('../fixtures/helper');
var userExams = require('../fixtures/userExams');
var _ = require('lodash');

module.exports = {
  path: '/ProfMedService/uxsession/find',
  method: 'GET',
  callback: function(req, res) {

    var userExam = _.find(userExams, {id: req.query.id});
    if(_.get(userExam, 'attributes')) {
      userExam.attributes.endTime = new Date(Date.now() + 9e6);
      userExam.attributes.startTime = new Date(Date.now() - 3e6);
    }

    var data = userExam;

    var body = helper.generateContainer('userExam', data);
    if(!userExam) {
      body.status = 'failed';
      body.reason = 'not found';
    }

    helper.sendResponse(req, res, body, 1000);
  }
}
