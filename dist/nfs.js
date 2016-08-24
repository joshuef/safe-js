'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.renameFile = exports.renameDirectory = exports.rename = exports.modifyFileContent = exports.getFile = exports.getDir = exports.createFile = exports.deleteFile = exports.deleteDirectory = exports.createDir = undefined;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ROOT_PATH = {
    APP: 'app',
    DRIVE: 'drive'
};

var SERVER = 'http://localhost:8100/';

// create new directory
var createDir = exports.createDir = function createDir(token, dirPath, isPrivate, userMetadata) {
    var isPathShared = arguments.length <= 4 || arguments[4] === undefined ? false : arguments[4];
    var callback = arguments[5];

    var rootPath = isPathShared ? ROOT_PATH.DRIVE : ROOT_PATH.APP;
    dirPath = dirPath[0] === '/' ? dirPath.slice(1) : dirPath;
    var url = SERVER + 'nfs/directory/' + rootPath + '/' + dirPath;
    var payload = {
        method: 'POST',
        headers: {
            Authorization: 'Bearer ' + token
        },
        body: {
            isPrivate: isPrivate,
            userMetabody: userMetadata
        }
    };
    return (0, _isomorphicFetch2.default)(url, payload).then(function (response) {
        if (response.status !== 200 && response.status !== 206) {
            console.debug('safe-js.nfs.createDir failed with status ' + response.status + ' ' + response.statusText);
        }

        return response;
    });
};

var deleteDirectory = exports.deleteDirectory = function deleteDirectory(token, dirPath) {
    var isPathShared = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];
    var callback = arguments[3];

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
            console.debug('safe-js.nfs.deleteDirectory failed with status ' + response.status + ' ' + response.statusText);
        }

        return response;
    });
};

var deleteFile = exports.deleteFile = function deleteFile(token, filePath) {
    var isPathShared = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];
    var callback = arguments[3];

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
            console.debug('safe-js.nfs.deleteFile failed with status ' + response.status + ' ' + response.statusText);
        }

        return response;
    });
};

var createFile = exports.createFile = function createFile(token, filePath, dataToWrite, metadata) {
    var isPathShared = arguments.length <= 4 || arguments[4] === undefined ? false : arguments[4];
    var callback = arguments[5];

    var rootPath = isPathShared ? ROOT_PATH.DRIVE : ROOT_PATH.APP;
    var url = SERVER + 'nfs/file/' + rootPath + '/' + filePath;
    var payload = {
        method: 'POST',
        headers: {
            Authorization: 'Bearer ' + token,
            metabody: metadata
        },
        body: JSON.stringify(dataToWrite)
    };

    return (0, _isomorphicFetch2.default)(url, payload).then(function (response) {
        if (response.status !== 200 && response.status !== 206) {
            console.debug('safe-js.nfs.createFile failed with status ' + response.status + ' ' + response.statusText);
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

// get specific directory
var getDir = exports.getDir = function getDir(token, callback, dirPath) {
    var isPathShared = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];

    var rootPath = isPathShared ? ROOT_PATH.DRIVE : ROOT_PATH.APP;
    var url = SERVER + 'nfs/directory/' + rootPath + '/' + dirPath;
    var payload = {
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + token
        }
    };
    return (0, _isomorphicFetch2.default)(url, payload).then(function (response) {
        if (response.status !== 200 && response.status !== 206) {
            console.debug('safe-js.nfs.getDir failed with status ' + response.status + ' ' + response.statusText);
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
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'text/plain'
        }
    };

    return (0, _isomorphicFetch2.default)(url, payload).then(function (response) {
        if (response.status !== 200 && response.status !== 206) {
            console.debug('safe-js.nfs.getFile failed with status ' + response.status + ' ' + response.statusText);
        }

        if (response.status === 200) {
            return response.json().then(function (json) {
                response.__parsedResponseBody__ = json;
                return response;
            });
        } else {
            return response;
        }
    }).catch(function (error) {
        console.debug("safe-js.nfs.getFile response error", error);
    });
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
            // 'Range': 'Bytes=' + offset + '-'
            Authorization: 'Bearer ' + token
        },
        body: JSON.stringify(dataToWrite)
    };

    return (0, _isomorphicFetch2.default)(url, payload).then(function (response) {
        var parsedResponse = void 0;
        console.log("RESPONSSSNNNSESSEE???", response);
        if (response.status !== 200) {
            console.debug('safe-js.nfs.modifyFileContent failed with status ' + response.status + ' ' + response.statusText);

            var errMsg = response.body;

            if (!response.status) {
                var errObject = {
                    errorCode: 400,
                    description: 'Request connection closed abruptly'
                };
                return errObject;
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

var rename = exports.rename = function rename(token, path) {
    var isPathShared = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];
    var newName = arguments[3];
    var isFile = arguments[4];
    var callback = arguments[5];

    var rootPath = isPathShared ? ROOT_PATH.DRIVE : ROOT_PATH.APP;
    var url = SERVER + (isFile ? 'nfs/file/metadata/' : 'nfs/directory/') + rootPath + '/' + path;
    var payload = {
        method: 'PUT',
        headers: {
            Authorization: 'Bearer ' + token
        },
        body: {
            name: newName
        }
    };
    return (0, _isomorphicFetch2.default)(url, payload).then(function (response) {
        if (response.status !== 200 && response.status !== 206) {
            console.debug('safe-js.nfs.deleteDirectory failed with status ' + response.status + ' ' + response.statusText);
        }

        return response;
    });
};

var renameDirectory = exports.renameDirectory = function renameDirectory(token, dirPath) {
    var isPathShared = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];
    var newName = arguments[3];
    var callback = arguments[4];

    rename(dirPath, isPathShared, newName, false, callback);
};

var renameFile = exports.renameFile = function renameFile(oldPath) {
    var isPathShared = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
    var newPath = arguments[2];
    var callback = arguments[3];

    rename(dirPath, isPathShared, newName, true, callback);
};