import fetch    from 'isomorphic-fetch';

const VERSION = '0.5';
const SERVER = 'http://localhost:8100/' + VERSION + '/';
/*
* Manifest for Beaker: 
* https://github.com/pfrazee/beaker/blob/master/doc/authoring-plugins.md#api-manifests
*/
export const manifest = {
    createPublicId      : 'promise',
    getDns              : 'promise',
    getServices         : 'promise',
    addService          : 'promise',
}


 export const createPublicId = function( token, longName ) {
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
            throw new Error( 'SAFE createPublicId failed with status ' + response.status + ' ' + response.statusText );
        }

        return response
    });
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
        if (response.status !== 200 && response.status !== 206)
        {
            throw new Error( 'SAFE getDns failed with status ' + response.status + ' ' + response.statusText );
        }

        return response
    });
  };

  // get service
 export const getServices = function( token, longName ) {
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
            throw new Error( 'SAFE getServices failed with status ' + response.status + ' ' + response.statusText );
        }

        return response
    });
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
