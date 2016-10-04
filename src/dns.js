'use strict';

import fetch    from 'isomorphic-fetch';
import {parseResponse, SERVER} from './utils';

/*
* Manifest for Beaker: 
* https://github.com/pfrazee/beaker/blob/master/doc/authoring-plugins.md#api-manifests
*/
export const manifest = {
    addService          : 'promise',
    createLongName      : 'promise',
    getDns       : 'promise',
    listServices        : 'promise'
};


  // add service
 export const addService = function( token, longName, serviceName, isPathShared, serviceHomeDirPath ) {
    let url = SERVER + 'dns';
    var payload = {
      method: 'PUT',
      headers: {
        Authorization: 'Bearer ' + token
      },
      data: {
        longName: longName,
        serviceName: serviceName,
        isPathShared: isPathShared,
        serviceHomeDirPath: serviceHomeDirPath
      }
    };
    return fetch( url, payload )
    .then( (response) => {
        if (response.status !== 200 && response.status !== 206)
        {
            throw new Error( 'SAFE addService failed with status ' + response.status + ' ' + response.statusText );
        }

        return response
    });
  };



 export const createLongName = function( token, longName ) {
    let url = SERVER + 'dns/' + longName;
    var payload = {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token
      }
    };
    return fetch( url, payload )
    .then( (response) => {
        if (response.status !== 200 && response.status !== 206)
        {
            return Promise.reject( 'SAFE createLongName failed with status ' + response.status + ' ' + response.details  );
        }
        
        if( response.ok )
        {
            return true;
        }
    })
  };

  // get dns list
 export const getDns = function( token ) {
    let url = SERVER + 'dns';
    var payload = {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token
      }
    };
    return fetch( url, payload )
    .then( (response) => {
        if (response.status !== 200)
        {
            throw new Error( 'SAFE getDns failed with status ' + response.status + ' ' + response.statusText );
        }

        return parseResponse(response);
    });
  };

  // get service
 export const listServices = function( token, longName ) {
    let url = SERVER + 'dns/' + longName;
    var payload = {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token
      }
    };
    return fetch( url, payload )
    .then( (response) => {
        if (response.status !== 200 && response.status !== 206)
        {
            throw new Error( 'SAFE listServices failed with status ' + response.status + ' ' + response.statusText );
        }

        return parseResponse(response);
    });
  };
