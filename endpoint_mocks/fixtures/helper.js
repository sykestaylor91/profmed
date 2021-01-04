module.exports = {
    generateContainer: function(resourceName, data) {

        var status = "ok";
        var response = {
            status: status,
            ts: Date.now()
        };

        if(data instanceof Array) {
          response.totalCount = data.length;
        }

        response[resourceName] = data;

        return response;
    },
    sendResponse: function(req, res, body, timeout) {

      setTimeout(function() {
        return res.json(body);
      }, timeout);
    }
};
