'use strict';

import fetch                    from 'isomorphic-fetch';
import url                      from 'url'
import {parseResponse, SERVER}  from './utils';

const dnsList           = null;

const localStorageExists =  ( typeof localStorage === 'undefined' ) ? false : true ;

var tokenStore = {};
// localStorage shim for node
if( !localStorageExists )
{
    var localStorage = {
        getItem : function(item) {
            return this[ item ];
        },
        setItem : function( key, item ) {
            this[ key ] = item;
        },
        clear : function()
        {
            return true;
        }
    };
}

/*
* Manifest for Beaker: 
* https://github.com/pfrazee/beaker/blob/master/doc/authoring-plugins.md#api-manifests
*/
export const manifest = {
    getAuthToken                : 'sync',
    getUserLongName             : 'sync',
    setAuthToken                : 'sync',
    setUserLongName             : 'sync',
    sendAuthorisationRequest    : 'promise',
    isTokenValid                : 'promise',
    authorise                   : 'promise'
}


/**
 * authorise the application on the SAFE Network
 * @param  { object }  packageData      safeAuth object 
 *                                      {
                                         name: '',
                                         id: '',
                                         version: '',
                                         vendor: ''
                                        }
 * @param  { string }  [tokenKey=TOKEN_KEY] key to save token as in localStorage (in a browser)
 * @param  {Boolean} isTokenValid         [OPTIONAL] Token validator function
 * @return {[type]}                       [description]
 *
 * TODO: Remove token check here, this should essentially just be the same as
 * sendAuthRequest
 */
export const authorise = function( packageData, token )
{   
    let tokenString = token;
    
    // for beaker only. Otherwise use localStorage.
    if( !localStorageExists && this && this.sender )
    {
        // get the webcontents url
        const wholeUrl = this.sender.getURL()
        const parsedUrl = url.parse( wholeUrl );
        tokenString = parsedUrl.hostname;
        
        //override vendor with the url?
        if( packageData )
            packageData.vendor = wholeUrl;
        
    }
    
    let tokenFromStorage = getAuthToken( tokenString );

    return isTokenValid( tokenFromStorage )
        .then( response => 
        {
            if( response )
            {
                return Promise.resolve( {
                    token: token,
                    checkedOut: true
                });
            }
            
            if ( !response ) 
            {
                localStorage.clear();
                //should return token
                return sendAuthorisationRequest( packageData, tokenString );
            }
        });
};



export const getAuthToken = function( tokenKey )
{
    if( !tokenKey )
    {
        return Promise.reject( 'tokenKey is missing.');
    }
    
    return localStorage.getItem( tokenKey );
};

export const getUserLongName = function( longNameKey, localStorage ) {
    return localStorage.getItem(longNameKey);
};

/**
 * Check if a token is valid with the current launcher
 * @param  {string}  token auth token for SAFE
 * @return {Boolean}      is the token valid?
 */
export const isTokenValid = function( token ) 
{
    
    let url         = SERVER + 'auth';
    var payload     = {
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + token
        }
    };

    return fetch( url, payload )
    .then( response => 
    {
        if( response.status === 200 && response.ok )
        {
           return Promise.resolve( true );
        }
        else 
        {
            return Promise.resolve( false );
        }
    });
};


export const setAuthToken = function( tokenKey, token)
{
    if( !tokenKey )
    {
        return Promise.reject( 'tokenKey is missing.');
    }
    
    if( !token )
    {
        return Promise.reject( 'token is missing.');
    }
    
    localStorage.setItem( tokenKey, token );
};

export const setUserLongName = function(longNameKey, longName) {
    localStorage.setItem(longNameKey, longName);
};

const sendAuthorisationRequest = function( packageData, tokenKey )
{
    if( !packageData )
    {
        return Promise.reject( 'packageData is missing.');
    }
    
    if( !tokenKey )
    {
        return Promise.reject( 'tokenKey is missing.');
    }
    
    
    const url = SERVER + 'auth';

    let authData = {
        app: {
            name: packageData.name,
            id: packageData.id,
            version: packageData.version,
            vendor: packageData.vendor
        },
        permissions: packageData.permissions
    };

    var payload = {
        method: 'POST',
        headers: {
           'content-type': 'application/json'
         },
        body: JSON.stringify( authData )
    };

    return fetch( url, payload )
    .then( response => 
    {
        return parseResponse(response);
    })
    .then( parsedResponse => {
	setAuthToken( tokenKey, parsedResponse.token );
        
	return parsedResponse;
    });
};
