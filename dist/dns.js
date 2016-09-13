'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addService = exports.getServices = exports.getDns = exports.createPublicId = exports.manifest = undefined;

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var VERSION = '0.5';
var SERVER = 'http://localhost:8100/' + VERSION + '/';
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

var createPublicId = exports.createPublicId = function createPublicId(token, longName, callback) {
  var url = SERVER + 'dns/' + longName;
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
var getDns = exports.getDns = function getDns(token, callback) {
  var url = SERVER + 'dns';
  var payload = {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + token
    }
  };
  return (0, _isomorphicFetch2.default)(url, payload).then(function (response) {
    if (response.status !== 200 && response.status !== 206) {
      throw new Error('SAFE getDns failed with status ' + response.status + ' ' + response.statusText);
    }

    return response;
  });
};

// get service
var getServices = exports.getServices = function getServices(token, longName, callback) {
  var url = SERVER + 'dns/' + longName;
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

    return response;
  });
};

// add service
var addService = exports.addService = function addService(token, longName, serviceName, isPathShared, serviceHomeDirPath, callback) {
  var url = SERVER + 'dns';
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