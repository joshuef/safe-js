'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.authorise = exports.isTokenValid = exports.sendAuthorisationRequest = exports.setUserLongName = exports.setAuthToken = exports.getUserLongName = exports.getAuthToken = exports.manifest = undefined;

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var VERSION = '0.5';
var SERVER = 'http://localhost:8100/' + VERSION + '/';
var TOKEN_KEY = 'MaidSafeDemoAppTokenReplaceThis';
var LONG_NAME_KEY = 'MaidSafeDemoAppLongNameReplaceThis';
var dnsList = null;

// localStorage shim for node
if (typeof localStorage === 'undefined') {
    var boom = 'aye';
    var localStorage = {
        getItem: function getItem(item) {
            return this[item];
        },
        setItem: function setItem(key, item) {
            this[key] = item;
        },
        clear: function clear() {
            return true;
        }
    };
}

/*
* Manifest for Beaker: 
* https://github.com/pfrazee/beaker/blob/master/doc/authoring-plugins.md#api-manifests
*/
var manifest = exports.manifest = {
    getAuthToken: 'sync',
    getUserLongName: 'sync',
    setAuthToken: 'sync',
    setUserLongName: 'sync',
    sendAuthorisationRequest: 'promise',
    isTokenValid: 'promise',
    authorise: 'promise'
};

var getAuthToken = exports.getAuthToken = function getAuthToken() {
    var tokenKey = arguments.length <= 0 || arguments[0] === undefined ? TOKEN_KEY : arguments[0];

    return localStorage.getItem(tokenKey);
};

var getUserLongName = exports.getUserLongName = function getUserLongName() {
    var longNameKey = arguments.length <= 0 || arguments[0] === undefined ? LONG_NAME_KEY : arguments[0];
    var localStorage = arguments[1];

    return localStorage.getItem(longNameKey);
};

var setAuthToken = exports.setAuthToken = function setAuthToken() {
    var tokenKey = arguments.length <= 0 || arguments[0] === undefined ? TOKEN_KEY : arguments[0];
    var token = arguments[1];

    localStorage.setItem(tokenKey, token);
};

var setUserLongName = exports.setUserLongName = function setUserLongName() {
    var longNameKey = arguments.length <= 0 || arguments[0] === undefined ? LONG_NAME_KEY : arguments[0];
    var longName = arguments[1];

    localStorage.setItem(longNameKey, longName);
};

var sendAuthorisationRequest = exports.sendAuthorisationRequest = function sendAuthorisationRequest(tokenKey) {
    var packageData = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var url = SERVER + 'auth';

    var authData = {
        app: {
            name: packageData.name,
            id: packageData.id,
            version: packageData.version,
            vendor: packageData.vendor
        },
        permissions: []
    };

    var payload = {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(authData)
    };

    return (0, _isomorphicFetch2.default)(url, payload).then(function (response) {
        var parsedResponse = void 0;
        if (response.status == 200) {
            parsedResponse = response.json().then(function (json) {
                response.__parsedResponseBody__ = json;

                return response;
            });
        }

        return parsedResponse || response;
    }).then(function (response) {
        if (response.status !== 200 && response.status !== 206) {
            throw new Error('SAFE sendAuthorisationRequest failed with status ' + response.status + ' ' + response.statusText);
        }

        var body = response.body;
        var headers = response.headers;
        var receivedToken = response.__parsedResponseBody__.token;

        if (!body && !headers) {

            throw new Error('SAFE sendAuthorisationRequest failed to connect to Launcher');
        }

        if (!receivedToken) {
            throw new Error('SAFE sendAuthorisationRequest failed to parse token from response');
        }

        setAuthToken(tokenKey, receivedToken);

        return response;
    });
};

var isTokenValid = exports.isTokenValid = function isTokenValid() {
    var tokenKey = arguments.length <= 0 || arguments[0] === undefined ? TOKEN_KEY : arguments[0];

    var url = SERVER + 'auth';
    var token = getAuthToken(tokenKey);
    var payload = {
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + token
        }
    };

    return (0, _isomorphicFetch2.default)(url, payload).then(function (response) {
        if (response.status !== 200 && response.status !== 401) {
            throw new Error('SAFE isTokenValid failed with status ' + response.status + ' ' + response.statusText);
        }
        return response;
    });
};

// authorise application
var authorise = exports.authorise = function authorise() {
    var tokenKey = arguments.length <= 0 || arguments[0] === undefined ? TOKEN_KEY : arguments[0];
    var packageData = arguments[1];

    return isTokenValid(tokenKey).then(function (response) {

        if (!response || response.error || response.status === 401) {
            localStorage.clear();
            return sendAuthorisationRequest(tokenKey, packageData);
        }
        return response;
    });
};