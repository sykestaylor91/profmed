var user = require('../fixtures/user');
var helper = require('../fixtures/helper');

module.exports = {
  path: '/PortalServiceV2/registration/authenticate',
  method: 'POST',
  callback: function(req, res) {

    var data = user;

    if(req.body.password) {
      data.authentication = true;
      data.token = 'portal-token';
      data.profmedToken = 'profmed-token';
    }

    var body = helper.generateContainer('user', data);

    if(req.body.userNameOrEmail.match(/^e/)) {
      body.status = 'failed';
      body.reason = 'whatever happened';
      delete body.user;
    }

    helper.sendResponse(req, res, body, 1000);
  }
}
