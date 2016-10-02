'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// 'use strict';

var VERSION = exports.VERSION = '0.5';
var SERVER = exports.SERVER = 'http://localhost:8100/' + VERSION + '/';

var parseResponse = exports.parseResponse = function parseResponse(response) {
  var parsedResponse = response.json().then(function (json) {
    response.__parsedResponseBody__ = json;
    return response;
  });
  return parsedResponse || response;
};