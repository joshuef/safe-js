'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dropHandle = exports.deserialise = exports.serialise = exports.manifest = undefined;

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SIGN_KEY_ENDPOINT = _utils.SERVER + 'sign-key/';

var manifest = exports.manifest = {
  serialise: 'promise',
  deserialise: 'promise',
  dropHandle: 'promise'
};

var serialise = exports.serialise = function serialise(token, handleId) {
  var url = SIGN_KEY_ENDPOINT + 'serialise/' + handleId;
  var payload = {
    method: 'GET'
  };
  if (token) {
    payload.headers = {
      'Authorization': 'Bearer ' + token
    };
  }
  return (0, _isomorphicFetch2.default)(url, payload).then(function (response) {
    if (response.status !== 200) {
      throw new Error('Serialise sign key failed with status ' + response.status + ' ' + response.statusText);
    }
    return response.buffer();
  });
};

var deserialise = exports.deserialise = function deserialise(token, data) {
  var url = SIGN_KEY_ENDPOINT + 'deserialise';
  var payload = {
    method: 'POST',
    body: data
  };
  if (token) {
    payload.headers = {
      'Authorization': 'Bearer ' + token
    };
  }
  return (0, _isomorphicFetch2.default)(url, payload).then(function (response) {
    if (response.status !== 200) {
      throw new Error('Serialise sign key failed with status ' + response.status + ' ' + response.statusText);
    }
    return (0, _utils.parseResponse)(response);
  });
};

var dropHandle = exports.dropHandle = function dropHandle(token, handleId) {
  var url = SIGN_KEY_ENDPOINT + handleId;
  var payload = {
    method: 'DELETE',
    headers: {
      'Authorization': 'Bearer ' + token
    }
  };
  return (0, _isomorphicFetch2.default)(url, payload).then(function (response) {
    if (response.status !== 200) {
      throw new Error('Drop sign key handle failed with status ' + response.status + ' ' + response.statusText);
    }
    return response;
  });
};