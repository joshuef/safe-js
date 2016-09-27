'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dropHandle = exports.serialise = exports.clearAll = exports.removeAt = exports.getSignKeyAt = exports.removeFromFilter = exports.addToFilter = exports.getMetadata = exports.append = exports.getDataIdAt = exports.post = exports.put = exports.getDataIdHandle = exports.getHandle = exports.create = exports.manifest = undefined;

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AD_ENDPOINT = _utils.SERVER + 'appendable-data/';

var manifest = exports.manifest = {
  create: 'promise',
  getHandle: 'promise',
  getDataIdHandle: 'promise',
  put: 'promise',
  post: 'promise',
  getDataIdAt: 'promise',
  append: 'promise',
  getMetadata: 'promise',
  removeAt: 'promise',
  addToFilter: 'promise',
  removeFromFilter: 'promise',
  getSignKeyAt: 'promise',
  clearAll: 'promise',
  serialise: 'promise',
  dropHandle: 'promise'
};

/**
 *
 * @param token
 * @param name
 * @param isPrivate
 * @param filterType - BlackList or WhiteList
 * @param filterKeys
 */
var create = exports.create = function create(token, name, isPrivate) {
  var filterType = arguments.length <= 3 || arguments[3] === undefined ? 'BlackList' : arguments[3];
  var filterKeys = arguments.length <= 4 || arguments[4] === undefined ? [] : arguments[4];

  var payload = {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + token
    },
    body: {
      name: _crypto2.default.createHash('sha256').update(name).digest('base64'),
      isPrivate: isPrivate,
      filterType: filterType,
      filterKeys: filterKeys
    }
  };
  (0, _isomorphicFetch2.default)(AD_ENDPOINT, payload).then(function (response) {
    if (response.status !== 200) {
      throw new Error({ error: 'AppendableData creation failed with status ' + response.status + ' ' + response.statusText,
        errorPayload: payload,
        errorUrl: AD_ENDPOINT
      });
    }
    return (0, _utils.parseResponse)(response);
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
  var url = AD_ENDPOINT + 'handle/' + dataIdHandle;
  (0, _isomorphicFetch2.default)(url, payload).then(function (response) {
    if (response.status !== 200) {
      throw new Error({ error: 'Get AppendableData handle failed with status ' + response.status + ' ' + response.statusText,
        errorPayload: payload,
        errorUrl: url
      });
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
  var url = AD_ENDPOINT + 'data-id/' + handleId;
  (0, _isomorphicFetch2.default)(url, payload).then(function (response) {
    if (response.status !== 200) {
      throw new Error({ error: 'Get DataId handle of AppendableData failed with status ' + response.status + ' ' + response.statusText,
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
  var url = AD_ENDPOINT + '/' + handleId;
  (0, _isomorphicFetch2.default)(url, payload).then(function (response) {
    if (response.status !== 200) {
      throw new Error({ error: 'PUT of AppendableData failed with status ' + response.status + ' ' + response.statusText,
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
  var url = AD_ENDPOINT + handleId;
  (0, _isomorphicFetch2.default)(url, payload).then(function (response) {
    if (response.status !== 200) {
      throw new Error({ error: 'POST of AppendableData failed with status ' + response.status + ' ' + response.statusText,
        errorPayload: payload,
        errorUrl: url
      });
    }
    return response;
  });
};

var getDataIdAt = exports.getDataIdAt = function getDataIdAt(token, handleId, index) {
  var fromDeleted = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];

  var url = AD_ENDPOINT + (fromDeleted ? 'deleted-data/' : '') + handleId + '/' + index;
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
      throw new Error('Fetch DataId from AppendableData failed with status ' + response.status + ' ' + response.statusText);
    }
    return (0, _utils.parseResponse)(response);
  });
};

var append = exports.append = function append(token, handleId, dataIdHandle) {
  var url = AD_ENDPOINT + handleId + '/' + dataIdHandle;
  var payload = {
    method: 'PUT',
    headers: {
      'Authorization': 'Bearer ' + token
    }
  };
  return (0, _isomorphicFetch2.default)(url, payload).then(function (response) {
    if (response.status !== 200) {
      throw new Error('Append to AppendableData failed with status ' + response.status + ' ' + response.statusText);
    }
    return response;
  });
};

var getMetadata = exports.getMetadata = function getMetadata(token, handleId) {
  var url = AD_ENDPOINT + handleId;
  var payload = {
    method: 'HEAD'
  };
  if (token) {
    payload.headers = {
      'Authorization': 'Bearer ' + token
    };
  }
  return (0, _isomorphicFetch2.default)(url, payload).then(function (response) {
    if (response.status !== 200) {
      throw new Error('Add to filter of AppendableData failed with status ' + response.status + ' ' + response.statusText);
    }
    return (0, _utils.parseResponse)(response);
  });
};

var addToFilter = exports.addToFilter = function addToFilter(token, handleId, signKeys) {
  var url = AD_ENDPOINT + 'filter/' + handleId;
  var payload = {
    method: 'PUT',
    headers: {
      'Authorization': 'Bearer ' + token
    },
    body: signKeys
  };
  return (0, _isomorphicFetch2.default)(url, payload).then(function (response) {
    if (response.status !== 200) {
      throw new Error('Remove from filter of AppendableData failed with status ' + response.status + ' ' + response.statusText);
    }
    return response;
  });
};

var removeFromFilter = exports.removeFromFilter = function removeFromFilter(token, handleId, signKeys) {
  var url = AD_ENDPOINT + 'filter/' + handleId;
  var payload = {
    method: 'DELETE',
    headers: {
      'Authorization': 'Bearer ' + token
    },
    body: signKeys
  };
  return (0, _isomorphicFetch2.default)(url, payload).then(function (response) {
    if (response.status !== 200) {
      throw new Error('Remove from filter of AppendableData failed with status ' + response.status + ' ' + response.statusText);
    }
    return response;
  });
};

var getSignKeyAt = exports.getSignKeyAt = function getSignKeyAt(token, handleId, index, fromDeleted) {
  var url = AD_ENDPOINT + 'sign-key/' + (fromDeleted ? 'deleted-data/' : '') + handleId + '/' + index;
  var payload = {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + token
    }
  };
  return (0, _isomorphicFetch2.default)(url, payload).then(function (response) {
    if (response.status !== 200) {
      throw new Error('Get sign key from AppendableData failed with status ' + response.status + ' ' + response.statusText);
    }
    return (0, _utils.parseResponse)(response);
  });
};

var removeAt = exports.removeAt = function removeAt(token, handleId, index, fromDeleted) {
  var url = AD_ENDPOINT + (fromDeleted ? 'deleted-data/' : '') + handleId + '/' + index;
  var payload = {
    method: 'DELETE',
    headers: {
      'Authorization': 'Bearer ' + token
    }
  };
  return (0, _isomorphicFetch2.default)(url, payload).then(function (response) {
    if (response.status !== 200) {
      throw new Error('Remove from AppendableData failed with status ' + response.status + ' ' + response.statusText);
    }
    return response;
  });
};

var clearAll = exports.clearAll = function clearAll(token, handleId, fromDeleted) {
  var url = AD_ENDPOINT + (fromDeleted ? 'clear-deleted-data/' : 'clear-data/') + handleId;
  var payload = {
    method: 'DELETE',
    headers: {
      'Authorization': 'Bearer ' + token
    }
  };
  return (0, _isomorphicFetch2.default)(url, payload).then(function (response) {
    if (response.status !== 200) {
      throw new Error('Clear data from AppendableData failed with status ' + response.status + ' ' + response.statusText);
    }
    return response;
  });
};

var serialise = exports.serialise = function serialise(token, handleId) {
  var url = AD_ENDPOINT + 'serialise/' + handleId;
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
      throw new Error('Clear data from AppendableData failed with status ' + response.status + ' ' + response.statusText);
    }
    return response;
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
  var url = AD_ENDPOINT + 'handle/' + handleId;
  (0, _isomorphicFetch2.default)(url, payload).then(function (response) {
    if (response.status !== 200) {
      throw new Error({ error: 'Drop AppendableData handle failed with status ' + response.status + ' ' + response.statusText,
        errorPayload: payload,
        errorUrl: url
      });
    }
    return response;
  });
};