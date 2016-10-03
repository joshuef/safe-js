'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dropHandle = exports.getHandle = exports.getEncryptionTypes = exports.ENCRYPTION_TYPE = exports.manifest = undefined;

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CIPHER_OPTS_ENDPOINT = _utils.SERVER + 'cipher-opts/';

var manifest = exports.manifest = {
  getHandle: 'promise',
  dropHandle: 'promise',
  getEncryptionTypes: 'sync'
};

var ENCRYPTION_TYPE = exports.ENCRYPTION_TYPE = {
  PLAIN: 'PLAIN',
  SYMMETRIC: 'SYMMETRIC',
  ASYMMETRIC: 'ASYMMETRIC'
};

var getEncryptionTypes = exports.getEncryptionTypes = function getEncryptionTypes() {
  return ENCRYPTION_TYPE;
};

var getHandle = exports.getHandle = function getHandle(token, encType, encryptKeyHandle) {
  var payload = {
    method: 'GET'
  };
  if (token) {
    payload.headers = {
      Authorization: 'Bearer ' + token
    };
  }
  var url = CIPHER_OPTS_ENDPOINT + encType;
  if (encryptKeyHandle) {
    url += '/' + encryptKeyHandle;
  }
  return (0, _isomorphicFetch2.default)(url, payload).then(function (response) {
    if (response.status !== 200) {
      throw new Error(JSON.stringify({ error: 'Get Cipher-Opts handle failed with status ' + response.status + ' ' + response.statusText,
        errorPayload: payload,
        errorUrl: url
      }));
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
  var url = CIPHER_OPTS_ENDPOINT + handleId;
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