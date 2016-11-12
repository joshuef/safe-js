'use strict';

import fetch    from 'isomorphic-fetch';
import { parseResponse,
	 checkBooleanResponse,
	 SERVER,
	 ROOT_PATH }  from './utils';


/*
* Manifest for Beaker: 
* https://github.com/pfrazee/beaker/blob/master/doc/authoring-plugins.md#api-manifests
*/
export const manifest = {
    createDir               : 'promise',
    createFile              : 'promise',
    createOrUpdateFile      : 'promise',
    deleteDir               : 'promise',
    deleteFile              : 'promise',
    getDir                  : 'promise',
    getFile                 : 'promise',
    getFileMetadata         : 'promise',
    moveFile                : 'promise',
    moveDir                 : 'promise',
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
	    'Authorization' : 'Bearer ' + token,
	    'Content-Type'  : 'application/json'
        },
	body: JSON.stringify({
            isPrivate: isPrivate,
            metadata: userMetadata
		})
    };
		
    return fetch( url, payload)
    	.then( (response) => {
			return checkBooleanResponse( response );
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
			return checkBooleanResponse( response );
	    });
};


export const createOrUpdateFile = function( token, filePath, dataToWrite, dataType = 'text/plain', dataLength, metadata, isPathShared = false )
{
	return getFileMetadata( token, filePath, isPathShared )
		.then( headers => 
		{
			return deleteFile( token, filePath, isPathShared )
			.then( success => 
			{
				if( success )
				{
					return createFile( token, filePath, dataToWrite, dataType, dataLength, metadata, isPathShared );
				}
			})

		})
		.catch( response =>
		{
			//file doesnt exist 
			if( response.status === 404 )
			{
				return createFile( token, filePath, dataToWrite, dataType, dataLength, metadata, isPathShared );
			}
			else 
			{
				return Promise.reject( parseResponse( response ) )
			}
		} )
}


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
	return checkBooleanResponse( response );

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
	return checkBooleanResponse( response );

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
	return parseResponse( response )

    });
};


const validResponseParsing = [ 'buffer','blob','json','text' ];
export const getFile = function( token, filePath, responseParsing = 'text' , isPathShared = false ) {
	
	if( !validResponseParsing.includes( responseParsing ) )
	{
		return Promise.reject( new Error( 'invalid response parsing method, should be one of: ' + validResponseParsing.join() ));
	}
	
    var rootPath = isPathShared ? ROOT_PATH.DRIVE : ROOT_PATH.APP;
    var url = SERVER + 'nfs/file/' + rootPath + '/' + filePath;
    var payload = {
        headers: {
            'Authorization':'Bearer ' + token
        }
    };
	    
    return fetch(url, payload)
        .then( (response) => {
			
			if( ! response.ok )
			{
				return parseResponse( response );
			}
			
			if( ! responseParsing )
			{
				return response;
			}
			else 
			{
				return response[ responseParsing ]();
			}

        })

};

export const getFileMetadata = function( token, filePath, isPathShared = false ) {
    var rootPath = isPathShared ? ROOT_PATH.DRIVE : ROOT_PATH.APP;
    var url = SERVER + 'nfs/file/' + rootPath + '/' + filePath;
    var payload = {
		method: 'HEAD',
        headers: {
            'Authorization':'Bearer ' + token
        }
    };
	    
    return fetch(url, payload)
        .then( (response) => {
			if( response.status === 200 )
			{
				return response.headers;
			}
			else 
			{
				return Promise.reject( response );
			}
        })

};

export const moveDir = function( token, srcRootPath, srcPath, destRootPath , destPath, action = 'move' ) 
{
	if ( ! action.match(/move|copy/) )
	{
		return Promise.reject('invalid action for move, was: ', action );
	}
	
	return move( 'dir', token, srcRootPath, srcPath, destRootPath , destPath, action );
}

export const moveFile = function( token, srcRootPath, srcPath, destRootPath , destPath, action = 'move' ) 
{
	if ( ! action.match(/move|copy/) )
	{
		return Promise.reject('invalid action for move, was: ', action );
	}
	
	return move( 'file', token, srcRootPath, srcPath, destRootPath , destPath, action );
}

//action is move or copy
const move = function( fileOrDir, token, srcRootPath, srcPath, destRootPath , destPath, action = 'move' ) 
{
	if ( ! fileOrDir.match(/file|dir/) )
	{
		return Promise.reject('invalid target for move, should be "file" or "dir", was: ', fileOrDir );
	}
	
	let url = SERVER + 'nfs/movefile';
	
	if( fileOrDir === 'dir' )
	{
		url = SERVER + 'nfs/movedir' ;
	}

    var payload = {
	method: 'POST',
	headers: {
	    'Authorization':'Bearer ' + token,
	    'Content-Type' : 'application/json'

	},
	body: JSON.stringify(
	    {
		"srcRootPath": srcRootPath,
		"srcPath": srcPath,
		"destRootPath": destRootPath,
		"destPath": destPath,
		"action": action
	    })
	};

    return fetch(url, payload)
	.then( (response) => {
	    return checkBooleanResponse( response );
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
	return checkBooleanResponse( response )

    });
};

export const renameDir = function(token, dirPath, newName, metadata,  isPathShared = false) {
    return rename(token, dirPath, newName, false, metadata, isPathShared );
};

export const renameFile = function(token, oldPath, newName, metadata, isPathShared = false ) {
    return rename(token, oldPath, newName, true, metadata );
};
