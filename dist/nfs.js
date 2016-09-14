'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.renameFile = exports.renameDir = exports.rename = exports.modifyFileContent = exports.getFile = exports.getDir = exports.deleteFile = exports.deleteDir = exports.createFile = exports.createDir = exports.manifest = undefined;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ROOT_PATH = {
    APP: 'app',
    DRIVE: 'drive'
};

var VERSION = '0.5';
var SERVER = 'http://localhost:8100/' + VERSION + '/';

/*
* Manifest for Beaker: 
* https://github.com/pfrazee/beaker/blob/master/doc/authoring-plugins.md#api-manifests
*/
var manifest = exports.manifest = {
    createDir: 'promise',
    deleteDir: 'promise',
    deleteFile: 'promise',
    createFile: 'promise',
    getDir: 'promise',
    getFile: 'promise',
    modifyFileContent: 'promise',
    rename: 'promise',
    renameDir: 'promise',
    renameFile: 'promise'
};

// create new directory
var createDir = exports.createDir = function createDir(token, dirPath, isPrivate, userMetadata) {
    var isPathShared = arguments.length <= 4 || arguments[4] === undefined ? false : arguments[4];

    var rootPath = isPathShared ? ROOT_PATH.DRIVE : ROOT_PATH.APP;
    dirPath = dirPath[0] === '/' ? dirPath.slice(1) : dirPath;
    var url = SERVER + 'nfs/directory/' + rootPath + '/' + dirPath;
    var payload = {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token
        },
        body: {
            isPrivate: isPrivate,
            userMetabody: userMetadata
        }
    };
    return (0, _isomorphicFetch2.default)(url, payload).then(function (response) {
        if (response.status !== 200 && response.status !== 206) {
            throw new Error({ error: 'SAFE createDir failed with status ' + response.status + ' ' + response.statusText,
                errorPayload: payload,
                errorUrl: url
            });
        }

        return response;
    });
};

var createFile = exports.createFile = function createFile(token, filePath, dataToWrite) {
    var dataType = arguments.length <= 3 || arguments[3] === undefined ? 'text/plain' : arguments[3];
    var dataLength = arguments[4];
    var metadata = arguments[5];
    var isPathShared = arguments.length <= 6 || arguments[6] === undefined ? false : arguments[6];

    var rootPath = isPathShared ? ROOT_PATH.DRIVE : ROOT_PATH.APP;
    var url = SERVER + 'nfs/file/' + rootPath + '/' + filePath;
    var payload = {
        method: 'POST',
        headers: {
            Authorization: 'Bearer ' + token,
            'Content-Length': dataLength || dataToWrite.length,
            'Content-Type': dataType

        },
        body: dataToWrite
    };

    if (metadata) {
        payload.headers.Metadata = metadata;
    }

    return (0, _isomorphicFetch2.default)(url, payload).then(function (response) {
        if (response.status !== 200 && response.status !== 206) {
            throw new Error('SAFE createFile failed with status ' + response.status + ' ' + response.statusText);
        }

        if (response.status === 200) {
            return response;
        }
    });
};

var deleteDir = exports.deleteDir = function deleteDir(token, dirPath) {
    var isPathShared = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

    var rootPath = isPathShared ? ROOT_PATH.DRIVE : ROOT_PATH.APP;
    var url = SERVER + 'nfs/directory/' + rootPath + '/' + dirPath;
    var payload = {
        method: 'DELETE',
        headers: {
            Authorization: 'Bearer ' + token
        }
    };
    return (0, _isomorphicFetch2.default)(url, payload).then(function (response) {
        if (response.status !== 200 && response.status !== 206) {
            throw new Error('SAFE deleteDir failed with status ' + response.status + ' ' + response.statusText);
        }

        return response;
    });
};

var deleteFile = exports.deleteFile = function deleteFile(token, filePath) {
    var isPathShared = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

    var rootPath = isPathShared ? ROOT_PATH.DRIVE : ROOT_PATH.APP;
    var url = SERVER + 'nfs/file/' + rootPath + '/' + filePath;
    var payload = {
        method: 'DELETE',
        headers: {
            Authorization: 'Bearer ' + token
        }
    };
    return (0, _isomorphicFetch2.default)(url, payload).then(function (response) {
        if (response.status !== 200 && response.status !== 206) {
            throw new Error('SAFE deleteFile failed with status ' + response.status + ' ' + response.statusText);
        }

        return response;
    });
};

// get specific directory
var getDir = exports.getDir = function getDir(token, dirPath) {
    var isPathShared = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

    var rootPath = isPathShared ? ROOT_PATH.DRIVE : ROOT_PATH.APP;
    var url = SERVER + 'nfs/directory/' + rootPath + '/' + dirPath;
    var payload = {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    };
    return (0, _isomorphicFetch2.default)(url, payload).then(function (response) {
        if (response.status !== 200 && response.status !== 206) {
            throw new Error('SAFE getDir failed with status ' + response.status + ' ' + response.statusText);
        }

        return response;
    });
};

var getFile = exports.getFile = function getFile(token, filePath) {
    var isPathShared = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];
    var downloadPath = arguments[3];

    var rootPath = isPathShared ? ROOT_PATH.DRIVE : ROOT_PATH.APP;
    var url = SERVER + 'nfs/file/' + rootPath + '/' + filePath;
    var payload = {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    };

    return (0, _isomorphicFetch2.default)(url, payload).then(function (response) {
        if (response.status !== 200 && response.status !== 206) {
            throw new Error('SAFE getFile failed with status ' + response.status + ' ' + response.statusText);
        }

        if (response.status === 200) {
            return response.json().then(function (json) {
                response.__parsedResponseBody__ = json;

                return response;
            });
        } else {
            return response;
        }
    });
    // .catch( error =>
    // {
    //     throw new Error( "SAFE getFile response error" , error );
    // })
};

// perhaps data object with mime type in there
var modifyFileContent = exports.modifyFileContent = function modifyFileContent(token, filePath, dataToWrite) {
    var isPathShared = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];
    var offset = arguments.length <= 4 || arguments[4] === undefined ? 0 : arguments[4];

    var self = this;
    var rootPath = isPathShared ? ROOT_PATH.DRIVE : ROOT_PATH.APP;
    var url = SERVER + 'nfs/file/' + rootPath + '/' + filePath;

    var payload = {
        method: 'PUT',
        headers: {
            'Content-Type': 'text/plain',
            Authorization: 'Bearer ' + token
        },
        body: JSON.stringify(dataToWrite)
    };

    return (0, _isomorphicFetch2.default)(url, payload).then(function (response) {
        var parsedResponse = void 0;

        if (response.status !== 200) {
            throw new Error('SAFE modifyFileContent failed with status ' + response.status + ' ' + response.statusText);

            var errMsg = response.body;

            if (!response.status) {
                var errObject = {
                    errorCode: 400,
                    description: 'Request connection closed abruptly'
                };
                throw new Error(errObject);
            }
        }
        if (response.status === 200) {
            return response.json().then(function (json) {
                response.__parsedResponseBody__ = json;
                return response;
            });
        } else {
            return response;
        }
    });
};

var rename = exports.rename = function rename(token, path, newName, metadata, isFile) {
    var isPathShared = arguments.length <= 5 || arguments[5] === undefined ? false : arguments[5];

    var rootPath = isPathShared ? ROOT_PATH.DRIVE : ROOT_PATH.APP;
    var url = SERVER + (isFile ? 'nfs/file/metadata/' : 'nfs/directory/') + rootPath + '/' + path;

    var payload = {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: newName
        })
    };

    return (0, _isomorphicFetch2.default)(url, payload).then(function (response) {
        if (response.status !== 200 && response.status !== 206) {
            throw new Error('SAFE rename failed with status ' + response.status + ' ' + response.statusText);
        }

        return response;
    });
};

var renameDir = exports.renameDir = function renameDir(token, dirPath) {
    var isPathShared = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];
    var newName = arguments[3];
    var callback = arguments[4];

    return rename(dirPath, isPathShared, newName, false, callback);
};

var renameFile = exports.renameFile = function renameFile(oldPath) {
    var isPathShared = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
    var newPath = arguments[2];
    var callback = arguments[3];

    return rename(dirPath, isPathShared, newName, true, callback);
};