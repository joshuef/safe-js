'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dropHandle = exports.getStructuredDataHandle = exports.getAppendableDataHandle = exports.manifest = undefined;

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DATA_ID_ENDPOINT = _utils.SERVER + 'data-id/';

var manifest = exports.manifest = {
  getAppendableDataHandle: 'promise',
  getStructuredDataHandle: 'promise',
  dropHandle: 'promise'
};

var getAppendableDataHandle = exports.getAppendableDataHandle = function getAppendableDataHandle(token, name) {
  var isPrivate = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

  if (typeof name === 'string') {
    name = _crypto2.default.createHash('sha256').update(name).digest('base64');
  }
  var body = {
    name: name,
    isPrivate: isPrivate
  };
  var payload = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  };
  if (token) {
    payload.headers.Authorization = 'Bearer ' + token;
  }
  var url = DATA_ID_ENDPOINT + 'appendable-data';
  return (0, _isomorphicFetch2.default)(url, payload).then(function (response) {
    if (response.status !== 200) {
      throw new Error({ error: 'Get DataId for AppendableData failed with status ' + response.status + ' ' + response.statusText,
        errorPayload: payload,
        errorUrl: url
      });
    }
    return (0, _utils.parseResponse)(response);
  });
};

var getStructuredDataHandle = exports.getStructuredDataHandle = function getStructuredDataHandle(token, name) {
  var typeTag = arguments.length <= 2 || arguments[2] === undefined ? 501 : arguments[2];

  if (typeof name === 'string') {
    name = _crypto2.default.createHash('sha256').update(name).digest('base64');
  }
  var body = {
    name: name,
    typeTag: typeTag
  };
  var payload = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  };
  if (token) {
    payload.headers.Authorization = 'Bearer ' + token;
  }
  var url = DATA_ID_ENDPOINT + 'structured-data';
  return (0, _isomorphicFetch2.default)(url, payload).then(function (response) {
    if (response.status !== 200) {
      throw new Error({ error: 'Get DataId for AppendableData failed with status ' + response.status + ' ' + response.statusText,
        errorPayload: payload,
        errorUrl: url
      });
    }
    return (0, _utils.parseResponse)(response);
  });
};

var dropHandle = exports.dropHandle = function dropHandle(token, handleId) {
  var payload = {
    method: 'DELETE'
  };
  if (token) {
    payload.headers = {
      'Authorization': 'Bearer ' + token
    };
  }
  var url = DATA_ID_ENDPOINT + handleId;
  return (0, _isomorphicFetch2.default)(url, payload).then(function (response) {
    if (response.status !== 200) {
      throw new Error({ error: 'Drop DataId handle failed with status ' + response.status + ' ' + response.statusText,
        errorPayload: payload,
        errorUrl: url
      });
    }
    return response;
  });
};