var user = require('../fixtures/user');
var helper = require('../fixtures/helper');

module.exports = {
  path: '/ProfMedService/user/authenticate',
  method: 'POST',
  callback: function(req, res) {

    var data = user;

    var body = helper.generateContainer('user', data);

    helper.sendResponse(req, res, body, 1000);
  }
}
