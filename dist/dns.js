'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addService = exports.getServices = exports.getDns = exports.createPublicId = exports.manifest = undefined;

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
* Manifest for Beaker: 
* https://github.com/pfrazee/beaker/blob/master/doc/authoring-plugins.md#api-manifests
*/
var manifest = exports.manifest = {
  createPublicId: 'promise',
  getDns: 'promise',
  getServices: 'promise',
  addService: 'promise'
};

var createPublicId = exports.createPublicId = function createPublicId(token, longName) {
  var url = _utils.SERVER + 'dns/' + longName;
  var payload = {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + token
    }
  };
  return (0, _isomorphicFetch2.default)(url, payload).then(function (response) {
    if (response.status !== 200 && response.status !== 206) {
      throw new Error('SAFE createPublicId failed with status ' + response.status + ' ' + response.statusText);
    }

    return response;
  });
};

// get dns list
var getDns = exports.getDns = function getDns(token) {
  var url = _utils.SERVER + 'dns';
  var payload = {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + token
    }
  };
  return (0, _isomorphicFetch2.default)(url, payload).then(function (response) {
    if (response.status !== 200) {
      throw new Error('SAFE getDns failed with status ' + response.status + ' ' + response.statusText);
    }

    return (0, _utils.parseResponse)(response);
  });
};

// get service
var getServices = exports.getServices = function getServices(token, longName) {
  var url = _utils.SERVER + 'dns/' + longName;
  var payload = {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + token
    }
  };
  return (0, _isomorphicFetch2.default)(url, payload).then(function (response) {
    if (response.status !== 200 && response.status !== 206) {
      throw new Error('SAFE getServices failed with status ' + response.status + ' ' + response.statusText);
    }

    return (0, _utils.parseResponse)(response);
  });
};

// add service
var addService = exports.addService = function addService(token, longName, serviceName, isPathShared, serviceHomeDirPath) {
  var url = _utils.SERVER + 'dns';
  var payload = {
    method: 'PUT',
    headers: {
      Authorization: 'Bearer ' + token
    },
    data: {
      longName: longName,
      serviceName: serviceName,
      isPathShared: isPathShared,
      serviceHomeDirPath: serviceHomeDirPath
    }
  };
  return (0, _isomorphicFetch2.default)(url, payload).then(function (response) {
    if (response.status !== 200 && response.status !== 206) {
      throw new Error('SAFE addService failed with status ' + response.status + ' ' + response.statusText);
    }

    return response;
  });
};