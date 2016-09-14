'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.auth = exports.dns = exports.nfs = undefined;

var _nfs2 = require('./nfs');

var _nfs = _interopRequireWildcard(_nfs2);

var _dns2 = require('./dns');

var _dns = _interopRequireWildcard(_dns2);

var _auth2 = require('./auth');

var _auth = _interopRequireWildcard(_auth2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.nfs = _nfs;
exports.dns = _dns;
exports.auth = _auth;