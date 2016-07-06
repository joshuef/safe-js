import fetch    from 'isomorphic-fetch';

const SERVER = 'http://localhost:8100/'

 export const createPublicId = function( token, longName, callback) {
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
            console.debug('safe.dns.createPublicId failed with status ' + response.status + ' ' + response.statusText );
        }

        return response
    });
  };

  // get dns list
 export const getDns = function( token, callback) {
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
            console.debug('safe.dns.getDns failed with status ' + response.status + ' ' + response.statusText );
        }

        return response
    });
  };

  // get service
 export const getServices = function( token, longName, callback) {
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
            console.debug('safe.dns.getServices failed with status ' + response.status + ' ' + response.statusText );
        }

        return response
    });
  };

  // add service
 export const addService = function( token, longName, serviceName, isPathShared, serviceHomeDirPath, callback) {
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
            console.debug('safe.dns.addService failed with status ' + response.status + ' ' + response.statusText );
        }

        return response
    });
  };
