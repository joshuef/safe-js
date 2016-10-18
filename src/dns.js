'use strict';

import fetch    from 'isomorphic-fetch';
import { parseResponse, SERVER, ROOT_PATH } from './utils';

/*
* Manifest for Beaker: 
* https://github.com/pfrazee/beaker/blob/master/doc/authoring-plugins.md#api-manifests
*/
export const manifest = {
    addService          : 'promise',
    createLongName      : 'promise',
    listLongNames       : 'promise',
    listServices        : 'promise'
};


  // add service
 export const addService = function( token, longName, serviceName, serviceHomeDirPath, isPathShared ) {
    let url = SERVER + 'dns';
    let rootPath = isPathShared ? ROOT_PATH.DRIVE : ROOT_PATH.APP;


    var payload = {
      method: 'PUT',
      headers: {
	Authorization: 'Bearer ' + token,
	'Content-Type': 'application/json'
      },
	body: JSON.stringify ({
	  longName: longName,
	  serviceName: serviceName,
	  rootPath: rootPath,
	  serviceHomeDirPath: serviceHomeDirPath
      })
    };

    return fetch( url, payload )
    .then( (response) => {
	return parseResponse( response );
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
	return parseResponse( response );
    })
  };

  // get dns list
 export const listLongNames = function( token ) {
    let url = SERVER + 'dns';
    var payload = {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token
      }
    };

    return fetch( url, payload )
    .then( (response) => {
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
        return parseResponse(response);
    });
  };
