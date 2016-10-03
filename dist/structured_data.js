'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dropHandle = exports.readData = exports.post = exports.put = exports.getDataIdHandle = exports.getHandle = exports.updateData = exports.create = exports.manifest = undefined;

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SD_ENDPOINT = _utils.SERVER + 'structured-data/';

var manifest = exports.manifest = {
  create: 'promise',
  getHandle: 'promise',
  getDataIdHandle: 'promise',
  put: 'promise',
  post: 'promise',
  readData: 'promise',
  updateData: 'promise',
  dropHandle: 'promise'
};

/**
 *
 * @param token
 * @param name
 * @param typeTag
 * @param data- as base64 string
 * @param cipherOptsHandle
 */
var create = exports.create = function create(token, name) {
  var typeTag = arguments.length <= 2 || arguments[2] === undefined ? 501 : arguments[2];
  var data = arguments[3];
  var cipherOptsHandle = arguments[4];

  if (typeof name === 'string') {
    name = _crypto2.default.createHash('sha256').update(name).digest('base64');
  }
  var body = {
    name: name,
    typeTag: typeTag,
    cipherOpts: cipherOptsHandle,
    data: data
  };
  var payload = {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  };
  return (0, _isomorphicFetch2.default)(SD_ENDPOINT, payload).then(function (response) {
    if (response.status !== 200) {
      throw new Error({ error: 'StructuredData creation failed with status ' + response.status + ' ' + response.statusText,
        errorPayload: payload,
        errorUrl: SD_ENDPOINT
      });
    }
    return (0, _utils.parseResponse)(response);
  });
};

var updateData = exports.updateData = function updateData(token, handleId, data, cipherOptsHandle) {
  var body = {
    data: data,
    cipherOpts: cipherOptsHandle
  };
  var payload = {
    method: 'PATCH',
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  };
  var url = SD_ENDPOINT + handleId;
  return (0, _isomorphicFetch2.default)(url, payload).then(function (response) {
    if (response.status !== 200) {
      throw new Error({ error: 'Update StructuredData failed with status ' + response.status + ' ' + response.statusText,
        errorPayload: payload,
        errorUrl: url
      });
    }
    return response;
  });
};

var getHandle = exports.getHandle = function getHandle(token, dataIdHandle) {
  var payload = {
    method: 'GET'
  };
  if (token) {
    payload.headers = {
      Authorization: 'Bearer ' + token
    };
  }
  var url = SD_ENDPOINT + 'handle/' + dataIdHandle;
  return (0, _isomorphicFetch2.default)(url, payload).then(function (response) {
    if (response.status !== 200) {
      throw new Error(JSON.stringify({ error: 'Get StructuredData handle failed with status ' + response.status + ' ' + response.statusText,
        errorPayload: payload,
        errorUrl: url
      }));
    }
    return (0, _utils.parseResponse)(response);
  });
};

var getDataIdHandle = exports.getDataIdHandle = function getDataIdHandle(token, handleId) {
  var payload = {
    method: 'GET'
  };
  if (token) {
    payload.headers = {
      Authorization: 'Bearer ' + token
    };
  }
  var url = SD_ENDPOINT + 'data-id/' + handleId;
  return (0, _isomorphicFetch2.default)(url, payload).then(function (response) {
    if (response.status !== 200) {
      throw new Error({ error: 'Get DataId handle of StructuredData failed with status ' + response.status + ' ' + response.statusText,
        errorPayload: payload,
        errorUrl: url
      });
    }
    return (0, _utils.parseResponse)(response);
  });
};

var put = exports.put = function put(token, handleId) {
  var payload = {
    method: 'PUT',
    headers: {
      Authorization: 'Bearer ' + token
    }
  };
  var url = SD_ENDPOINT + handleId;
  return (0, _isomorphicFetch2.default)(url, payload).then(function (response) {
    if (response.status !== 200) {
      throw new Error({ error: 'PUT of StructuredData failed with status ' + response.status + ' ' + response.statusText,
        errorPayload: payload,
        errorUrl: url
      });
    }
    return response;
  });
};

var post = exports.post = function post(token, handleId) {
  var payload = {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + token
    }
  };
  var url = SD_ENDPOINT + handleId;
  return (0, _isomorphicFetch2.default)(url, payload).then(function (response) {
    if (response.status !== 200) {
      throw new Error({ error: 'PUT of StructuredData failed with status ' + response.status + ' ' + response.statusText,
        errorPayload: payload,
        errorUrl: url
      });
    }
    return response;
  });
};

var readData = exports.readData = function readData(token, handleId) {
  var url = SD_ENDPOINT + handleId;
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
      throw new Error('Read StructuredData failed with status ' + response.status + ' ' + response.statusText);
    }
    return response.buffer();
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
  var url = SD_ENDPOINT + 'handle/' + handleId;
  return (0, _isomorphicFetch2.default)(url, payload).then(function (response) {
    if (response.status !== 200) {
      throw new Error({ error: 'Drop StructuredData handle failed with status ' + response.status + ' ' + response.statusText,
        errorPayload: payload,
        errorUrl: url
      });
    }
    return response;
  });
};