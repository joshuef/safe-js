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






