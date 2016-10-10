'use strict';

import fetch    from 'isomorphic-fetch';
import {parseResponse, SERVER} from './utils';

const TOKEN_KEY         = 'MaidSafeDemoAppTokenReplaceThis';
const LONG_NAME_KEY     = 'MaidSafeDemoAppLongNameReplaceThis';
const dnsList           = null;


// localStorage shim for node
if( typeof localStorage === 'undefined' )
{
    var boom = 'aye';
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
export const authorise = function( packageData, tokenKey = TOKEN_KEY )
{   
    let token = getAuthToken( tokenKey );

    return isTokenValid( token )
        .then( response => 
        {
            if( response )
            {
                return {
                    token: token
                }
            }
            
            if ( !response ) 
            {
                localStorage.clear();
                //should return token
                return sendAuthorisationRequest( packageData, tokenKey );
            }
        });
};



export const getAuthToken = function( tokenKey = TOKEN_KEY )
{
    return localStorage.getItem( tokenKey );
};

export const getUserLongName = function( longNameKey = LONG_NAME_KEY, localStorage ) {
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
        if (response.status !== 200 && response.status !== 401  )
        {
            throw new Error( 'Token not valid. SAFE isTokenValid failed with status ' + response.status + ' ' + response.statusText );
            return false;
        }
        else if( response.status === 401 )
        {
            return false;
        }
        else if( response.status === 200 && response.ok )
        {
            
            return true;
        }
        
        return response;
    });
};


export const setAuthToken = function( tokenKey = TOKEN_KEY, token)
{
    localStorage.setItem( tokenKey, token );
};

export const setUserLongName = function(longNameKey = LONG_NAME_KEY, longName) {
    localStorage.setItem(longNameKey, longName);
};

export const sendAuthorisationRequest = function( packageData = {}, tokenKey = TOKEN_KEY )
{
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
    .then( response => {
        
        if (response.status !== 200 && response.status !== 206)
        {
            throw new Error( 'SAFE sendAuthorisationRequest failed with status ' +
                response.status + ' ' + response.body.description );
        }

        const body          = response.body;
        const headers       = response.headers;
        const receivedToken = response.__parsedResponseBody__.token;

        if (!body && !headers)
        {

            throw new Error( 'SAFE sendAuthorisationRequest failed to connect to Launcher');
        }


        if( !receivedToken )
        {
            throw new Error( 'SAFE sendAuthorisationRequest failed to parse token from response');
        }

        setAuthToken( tokenKey, receivedToken);

        return response
    });
};
