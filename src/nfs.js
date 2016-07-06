import fs from 'fs';

const ROOT_PATH =
{
    APP: 'app',
    DRIVE: 'drive'
};

const SERVER = 'http://localhost:8100/'

 var fetch = require('isomorphic-fetch');

  // create new directory
 export const createDir = function( token, dirPath, isPrivate, userMetadata, isPathShared = false, callback) {
    var rootPath = isPathShared ? ROOT_PATH.DRIVE : ROOT_PATH.APP;
    dirPath = dirPath[0] === '/' ? dirPath.slice(1) : dirPath;
    var payload = {
      url: SERVER + 'nfs/directory/' + rootPath + '/' + dirPath,
      method: 'POST',
      headers: {
        authorization: 'Bearer ' + token
      },
      data: {
        isPrivate: isPrivate,
        userMetadata: userMetadata
      }
    };
    (new fetch(payload, callback)).send();
  };

  // get specific directory
  export const getDir = function(token, callback, dirPath, isPathShared = false) {
    var rootPath = isPathShared ? ROOT_PATH.DRIVE : ROOT_PATH.APP;
    var URL = SERVER + 'nfs/directory/' + rootPath + '/' + dirPath;
    var payload = {
      url: URL,
      method: 'GET',
      headers: {
        authorization: 'Bearer ' + token
      }
    };
    (new fetch(payload, callback)).send();
  };

  export const deleteDirectory = function( token, dirPath, isPathShared = false, callback) {
    var rootPath = isPathShared ? ROOT_PATH.DRIVE : ROOT_PATH.APP;
    var url = SERVER + 'nfs/directory/' + rootPath + '/' + dirPath;
    var payload = {
      url: url,
      method: 'DELETE',
      headers: {
        authorization: 'Bearer ' + token
      }
    };
    (new fetch(payload, callback)).send();
  };

  export const deleteFile = function( token, filePath, isPathShared = false, callback) {
    var rootPath = isPathShared ? ROOT_PATH.DRIVE : ROOT_PATH.APP;
    var payload = {
      url: SERVER + 'nfs/file/' + rootPath + '/' + filePath,
      method: 'DELETE',
      headers: {
        authorization: 'Bearer ' + token
      }
    };
    (new fetch(payload, callback)).send();
  };

  export const createFile = function( token, filePath, metadata, isPathShared = false, callback) {
    var rootPath = isPathShared ? ROOT_PATH.DRIVE : ROOT_PATH.APP;
    var url = SERVER + 'nfs/file/' + rootPath + '/' + filePath;
    var payload = {
      url: url,
      method: 'POST',
      headers: {
        authorization: 'Bearer ' + token
      },
      data: {
        metadata: metadata
      }
    };
    (new fetch(payload, callback)).send();
  };

  export const modifyFileContent = function(token, filePath, isPathShared = false, localPath, offset, callback) {
    offset = offset || 0;
    var self = this;
    var rootPath = isPathShared ? ROOT_PATH.DRIVE : ROOT_PATH.APP;
    var url = SERVER + 'nfs/file/' + rootPath + '/' + filePath;
    var fileStream = fs.createReadStream(localPath).on('data', function(chunk) {
      callback(null, chunk.length);
    });
    fileStream.pipe(fetch(url, {
        method: PUT,
        headers: {
            'Content-Type': mime.lookup(filePath),
            'Range': 'Bytes=' + offset + '-'
        },
        auth: {
            'bearer': self.getAuthToken()
        }
    }, function(e, response) {
      if (response.statusCode !== 200) {
        var errMsg = response.body;
        if (!response.statusCode) {
          errMsg = {
            errorCode: 400,
            description: 'Request connection closed abruptly'
          }
        } else {
          try {
            errMsg = JSON.parse(errMsg);
          } catch(e) {
            errMsg = {
              errorCode: 400,
              description: errMsg
            }
          }
        }
        callback({data: !response.statusCode ? 'Request connection closed' : JSON.parse(response.body)});
      }
    }));
  };

  export const getFile = function( token, filePath, isPathShared = false, downloadPath ) {
    var rootPath = isPathShared ? ROOT_PATH.DRIVE : ROOT_PATH.APP;
    var url = SERVER + 'nfs/file/' + rootPath + '/' + filePath;
    var payload = {
        headers: {
            'Authorization':'Bearer ' + token,
            'Content-Type':'text/plain'
        }
    };

    console.log( payload );
    return fetch(url, payload)
    .then( (response) => {
      if (response.status !== 200 && response.status !== 206)
      {
        console.debug('SAGE.NFS.getFile Failed with status ' + response.status + ' ' + response.statusText );
      }

      return response
    })

  };

  export const rename = function(token, path, isPathShared = false, newName, isFile, callback) {
    var rootPath = isPathShared ? ROOT_PATH.DRIVE : ROOT_PATH.APP;
    var url = SERVER + (isFile ? 'nfs/file/metadata/' : 'nfs/directory/') + rootPath + '/' + path;
    var payload = {
      url: url,
      method: 'PUT',
      headers: {
        authorization: 'Bearer ' + token
      },
      data: {
        name: newName
      }
    };
    (new fetch(payload, callback)).send();
  };

  export const renameDirectory = function(token, dirPath, isPathShared = false, newName, callback) {
    rename(dirPath, isPathShared, newName, false, callback);
  };

  export const renameFile = function(oldPath, isPathShared = false, newPath, callback) {
    rename(dirPath, isPathShared, newName, true, callback);
  };
