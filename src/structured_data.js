'use strict';

import crypto from 'crypto';
import fetch from 'isomorphic-fetch';
import {parseResponse, SERVER} from './utils';

const SD_ENDPOINT = SERVER + 'structured-data/';

export const manifest = {
  create: 'promise',
  getHandle: 'promise',
  getDataIdHandle: 'promise',
  put: 'promise',
  post: 'promise',
  readData: 'promise',
  dropHandle: 'promise'
};

/**
 *
 * @param token
 * @param name
 * @param typeTag
 * @param data- as base64 string
 * @param cipherOptsHandle
 */
export const create = (token, name, typeTag = 501, data, cipherOptsHandle) => {
  const payload = {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + token
    },
    body: {
      name: crypto.createHash('sha256').update(name).digest('base64'),
      typeTag: typeTag,
      cipherOpts: cipherOptsHandle,
      data: data
    }
  };
  fetch(SD_ENDPOINT, payload)
    .then((response) => {
      if (response.status !== 200)
      {
        throw new Error({ error: 'StructuredData creation failed with status ' + response.status + ' ' + response.statusText,
          errorPayload: payload,
          errorUrl : SD_ENDPOINT
        });
      }
      return parseResponse(response);
    });
};

export const getHandle = (token, dataIdHandle) => {
  const payload = {
    method: 'GET'
  };
  if (token) {
    payload.headers = {
      Authorization: 'Bearer ' + token
    };
  }
  const url = SD_ENDPOINT + 'handle/' + dataIdHandle;
  fetch(url, payload)
    .then((response) => {
      if (response.status !== 200)
      {
        throw new Error({ error: 'Get StructuredData handle failed with status ' + response.status + ' ' + response.statusText,
          errorPayload: payload,
          errorUrl : url
        });
      }
      return parseResponse(response);
    });
};

export const getDataIdHandle = (token, handleId) => {
  const payload = {
    method: 'GET'
  };
  if (token) {
    payload.headers = {
      Authorization: 'Bearer ' + token
    };
  }
  const url = SD_ENDPOINT + 'data-id/' + handleId;
  fetch(url, payload)
    .then((response) => {
      if (response.status !== 200)
      {
        throw new Error({ error: 'Get DataId handle of StructuredData failed with status ' + response.status + ' ' + response.statusText,
          errorPayload: payload,
          errorUrl : url
        });
      }
      return parseResponse(response);
    });
};

export const put = (token, handleId) => {
  const payload = {
    method: 'PUT',
    headers: {
      Authorization: 'Bearer ' + token
    }
  };
  const url = SD_ENDPOINT + '/' + handleId;
  fetch(url, payload)
    .then((response) => {
      if (response.status !== 200)
      {
        throw new Error({ error: 'PUT of StructuredData failed with status ' + response.status + ' ' + response.statusText,
          errorPayload: payload,
          errorUrl : url
        });
      }
      return response;
    });
};

export const post = (token, handleId) => {
  const payload = {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + token
    }
  };
  const url = SD_ENDPOINT + handleId;
  fetch(url, payload)
    .then((response) => {
      if (response.status !== 200)
      {
        throw new Error({ error: 'PUT of StructuredData failed with status ' + response.status + ' ' + response.statusText,
          errorPayload: payload,
          errorUrl : url
        });
      }
      return response;
    });
};

export const readData = (token, handleId) => {
  var url = SD_ENDPOINT + handleId;
  var payload = {
    method: 'GET'
  };
  if (token) {
    payload.headers = {
      'Authorization':'Bearer ' + token
    }
  }
  return fetch(url, payload)
    .then((response) => {
      if (response.status !== 200)
      {
        throw new Error( 'Read StructuredData failed with status ' + response.status + ' ' + response.statusText );
      }
      return parseResponse(response);
    })
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
  const url = SD_ENDPOINT + 'handle/' + handleId;
  fetch(url, payload)
    .then((response) => {
      if (response.status !== 200)
      {
        throw new Error( { error: 'Drop StructuredData handle failed with status ' + response.status + ' ' + response.statusText,
          errorPayload: payload,
          errorUrl : url
        });
      }
      return response;
    });
};