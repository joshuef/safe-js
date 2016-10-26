'use strict';

import fetch                    from 'isomorphic-fetch';
import url                      from 'url'
import {parseResponse, SERVER}  from './utils';

const dnsList           = null;


/*
* Manifest for Beaker: 
* https://github.com/pfrazee/beaker/blob/master/doc/authoring-plugins.md#api-manifests
*/
export const manifest = {
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
 export const authorise = function( packageData )
 {
     if( !packageData )
     {
         return Promise.reject( 'packageData is missing.');
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
         return parseResponse( response );
     })
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






