'use strict';

import fetch from 'isomorphic-fetch';
import {parseResponse, SERVER} from './utils';

const CIPHER_OPTS_ENDPOINT = SERVER + 'cipher-opts/';

export const manifest = {
  getHandle: 'promise',
  dropHandle: 'promise',
  getEncryptionTypes: 'sync'
};

export const ENCRYPTION_TYPE = {
  PLAIN: 'PLAIN',
  SYMMETRIC: 'SYMMETRIC',
  ASYMMETRIC: 'ASYMMETRIC'
};

export const getEncryptionTypes = () => {
  return ENCRYPTION_TYPE;
};

export const getHandle = (token, encType, encryptKeyHandle) => {
  const payload = {
    method: 'GET'
  };
  if (token) {
    payload.headers = {
      Authorization: 'Bearer ' + token
    };
  }
  let url = CIPHER_OPTS_ENDPOINT + encType;
  if (encryptKeyHandle) {
    url += ('/' + encryptKeyHandle);
  }
  return fetch(url, payload)
    .then((response) => {
      if (response.status !== 200)
      {
        throw new Error( JSON.stringify({ error: 'Get Cipher-Opts handle failed with status ' + response.status + ' ' + response.statusText,
          errorPayload: payload,
          errorUrl : url
        }));
      }
      return parseResponse(response);
    });
};

export const dropHandle = (token, handleId) => {
  const payload = {
    method: 'DELETE'
  };
  if (token) {
    payload.headers = {
      'Authorization':'Bearer ' + token
    };
  }
  const url = CIPHER_OPTS_ENDPOINT + handleId;
  return fetch(url, payload)
    .then((response) => {
      if (response.status !== 200)
      {
        throw new Error( { error: 'Drop DataId handle failed with status ' + response.status + ' ' + response.statusText,
          errorPayload: payload,
          errorUrl : url
        });
      }
      return response
    });
};