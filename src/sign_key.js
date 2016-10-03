'use strict';

import fetch from 'isomorphic-fetch';
import {parseResponse, SERVER} from './utils';

const SIGN_KEY_ENDPOINT = SERVER + 'sign-key/';

export const manifest = {
  serialise: 'promise',
  deserialise: 'promise',
  dropHandle: 'promise'
};

export const serialise = (token, handleId) => {
  var url = SIGN_KEY_ENDPOINT + 'serialise/' + handleId;
  var payload = {
    method: 'GET'
  };
  if (token) {
    payload.headers = {
      'Authorization':'Bearer ' + token
    };
  }
  return fetch(url, payload)
    .then((response) => {
      if (response.status !== 200)
      {
        throw new Error('Serialise sign key failed with status ' + response.status + ' ' + response.statusText );
      }
      return response.buffer();
    });
};

export const deserialise = (token, data) => {
  var url = SIGN_KEY_ENDPOINT + 'deserialise';
  var payload = {
    method: 'POST',
    body: data
  };
  if (token) {
    payload.headers = {
      'Authorization':'Bearer ' + token
    };
  }
  return fetch(url, payload)
    .then((response) => {
      if (response.status !== 200)
      {
        throw new Error('Serialise sign key failed with status ' + response.status + ' ' + response.statusText );
      }
      return parseResponse(response);
    });
};

export const dropHandle = (token, handleId) => {
  var url = SIGN_KEY_ENDPOINT + handleId;
  var payload = {
    method: 'DELETE',
    headers: {
      'Authorization':'Bearer ' + token
    }
  };
  return fetch(url, payload)
    .then((response) => {
      if (response.status !== 200)
      {
        throw new Error('Drop sign key handle failed with status ' + response.status + ' ' + response.statusText );
      }
      return response;
    });
};