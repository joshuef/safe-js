'use strict';

import fetch    from 'isomorphic-fetch';
import {parseResponse, SERVER, ROOT_PATH }  from './utils';


/*
* Manifest for Beaker: 
* https://github.com/pfrazee/beaker/blob/master/doc/authoring-plugins.md#api-manifests
*/
export const manifest = {
    createDir               : 'promise',
    createFile              : 'promise',
    deleteDir               : 'promise',
    deleteFile              : 'promise',
    getDir                  : 'promise',
    getFile                 : 'promise',
    // modifyFileContent       : 'promise',
    rename                  : 'promise',
    renameDir               : 'promise',
    renameFile              : 'promise'
}



// create new directory
export const createDir = function( token, dirPath, isPrivate, userMetadata, isPathShared = false) 
{
    var rootPath = isPathShared ? ROOT_PATH.DRIVE : ROOT_PATH.APP;
    dirPath = dirPath[0] === '/' ? dirPath.slice(1) : dirPath;
    var url = SERVER + 'nfs/directory/' + rootPath + '/' + dirPath;
    var payload = {
        method: 'POST',
        headers: {
            'Authorization' : 'Bearer ' + token
        },
        body: {
            isPrivate: isPrivate,
            userMetabody: userMetadata
        }
    };
    return fetch( url, payload)
    .then( (response) => {
        if (response.status !== 200 && response.status !== 206)
        {
            throw new Error( { error: 'SAFE createDir failed with status ' + response.status + ' ' + response.statusText,
                                errorPayload: payload,
                                errorUrl : url
                            });
        }

        return response
    });
};


export const createFile = function( token, filePath, dataToWrite, dataType = 'text/plain', dataLength, metadata, isPathShared = false )
{
    var rootPath = isPathShared ? ROOT_PATH.DRIVE : ROOT_PATH.APP;
    var url = SERVER + 'nfs/file/' + rootPath + '/' + filePath;
    var payload = {
        method: 'POST',
        headers: {
            Authorization       : 'Bearer ' + token,
            'Content-Length'    : dataLength || dataToWrite.length,
            'Content-Type'      : dataType

        },
        body: dataToWrite
    };
    
    if( metadata )
    {
        payload.headers.Metadata = metadata;
    }
    
    return fetch( url, payload )
    .then( (response) => {
        if (response.status !== 200 && response.status !== 206)
        {
            throw new Error( 'SAFE createFile failed with status ' + response.status + ' ' + response.statusText );
        }

        if( response.status === 200 )
        {
            return response;
        }

    });
};



export const deleteDir = function( token, dirPath, isPathShared = false ) {
    var rootPath = isPathShared ? ROOT_PATH.DRIVE : ROOT_PATH.APP;
    var url = SERVER + 'nfs/directory/' + rootPath + '/' + dirPath;
    var payload = {
        method: 'DELETE',
        headers: {
            Authorization: 'Bearer ' + token
        }
    };
    return fetch(url, payload)
    .then( (response) => {
        if (response.status !== 200 && response.status !== 206)
        {
            throw new Error( 'SAFE deleteDir failed with status ' + response.status + ' ' + response.statusText );
        }

        return response
    });
};

export const deleteFile = function( token, filePath, isPathShared = false ) 
{
    var rootPath = isPathShared ? ROOT_PATH.DRIVE : ROOT_PATH.APP;
    var url = SERVER + 'nfs/file/' + rootPath + '/' + filePath;
    var payload = {
        method: 'DELETE',
        headers: {
            Authorization: 'Bearer ' + token
        }
    };
    return fetch(url, payload)
    .then( (response) => {
        if (response.status !== 200 && response.status !== 206)
        {
            throw new Error( 'SAFE deleteFile failed with status ' + response.status + ' ' + response.statusText );
        }

        return response
    });
};


// get specific directory
export const getDir = function(token, dirPath, isPathShared = false) {
    var rootPath = isPathShared ? ROOT_PATH.DRIVE : ROOT_PATH.APP;
    var url = SERVER + 'nfs/directory/' + rootPath + '/' + dirPath;
    var payload = {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    };
    return fetch( url, payload)
    .then( (response) => {
        if (response.status !== 200 && response.status !== 206)
        {
            throw new Error( 'SAFE getDir failed with status ' + response.status + ' ' + response.statusText );
        }

        return response
    });
};


export const getFile = function( token, filePath, isPathShared = false ) {
    var rootPath = isPathShared ? ROOT_PATH.DRIVE : ROOT_PATH.APP;
    var url = SERVER + 'nfs/file/' + rootPath + '/' + filePath;
    var payload = {
        headers: {
            'Authorization':'Bearer ' + token
        }
    };
    
    return fetch(url, payload)
        .then( (response) => {
            if (response.status !== 200 && response.status !== 206)
            {
                throw new Error( 'SAFE getFile failed with status ' + response.status + ' ' + response.statusText );
            }

            if( response.status === 200 )
            {
                return response.json().then( json =>
                    {
                        response.__parsedResponseBody__ = json
                        
                        return response;
                    })
            }
            else {
                return response;
            }
        })

};


export const rename = function(token, path, newName, isFile, metadata, isPathShared = false) {
    var rootPath = isPathShared ? ROOT_PATH.DRIVE : ROOT_PATH.APP;
    var url = SERVER + (isFile ? 'nfs/file/metadata/' : 'nfs/directory/') + rootPath + '/' + path;

    var payload = {
        method: 'PUT',
        headers: 
        {
            'Authorization'  : 'Bearer ' + token ,
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify ({
            name: newName,
        })
    };
    
    if( metadata )
    {
        payload.headers.Metadata = metadata;
    }
    
    return fetch( url, payload)
    .then( (response) => {
        
        if (response.status !== 200 && response.status !== 206)
        {
            throw new Error('SAFE rename failed with status ' + response.status + ' ' + response.statusText );
        }

        return response
    });
};

export const renameDir = function(token, dirPath, isPathShared = false, newName, callback) {
    return rename(dirPath, isPathShared, newName, false, callback);
};

export const renameFile = function(oldPath, isPathShared = false, newPath, callback) {
    return rename(dirPath, isPathShared, newName, true, callback);
};
