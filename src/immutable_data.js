'use strict';

import crypto from 'crypto';
import fetch from 'isomorphic-fetch';
import { parseResponse, SERVER } from './utils';

const IMMUT_DATA_ENDPOINT = SERVER + 'immutable-data/';

export const manifest = {
  getReaderHandle: 'promise',
  getWriterHandle: 'promise',
  read: 'promise',
  write: 'promise',
  closeWriter: 'promise',
  dropReader: 'promise',
  dropWriter: 'promise'
};

export const getReaderHandle = (token, handleId) => {
  const url = `${IMMUT_DATA_ENDPOINT}reader/${handleId}`;
  const payload = {
    method: 'GET'
  };
  if (token) {
    payload.headers = {
      Authorization: 'Bearer ' + token
    };
  }
  return fetch(url, payload)
    .then((response) => {
      if (response.status !== 200)
      {
        throw new Error({ error: 'Get Immutable Data reader handle failed with status ' + response.status + ' ' + response.statusText,
          errorPayload: payload,
          errorUrl : url
        });
      }
      return parseResponse(response);
    });
};

export const getWriterHandle = (token) => {
  const url = `${IMMUT_DATA_ENDPOINT}writer`;
  const payload = {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + token
    }
  };
  return fetch(url, payload)
    .then((response) => {
      if (response.status !== 200)
      {
        throw new Error({ error: 'Get Immutable Data writer handle failed with status ' + response.status + ' ' + response.statusText,
          errorPayload: payload,
          errorUrl : url
        });
      }
      return parseResponse(response);
    });
};

export const read = (token, handleId) => {
  const url = `${IMMUT_DATA_ENDPOINT}${handleId}`;
  const payload = {
    method: 'GET'
  };
  if (token) {
    payload.headers = {
      Authorization: 'Bearer ' + token
    };
  }
  return fetch(url, payload)
    .then((response) => {
      if (response.status !== 200)
      {
        throw new Error({ error: 'Read Immutable Data failed with status ' + response.status + ' ' + response.statusText,
          errorPayload: payload,
          errorUrl : url
        });
      }
      return response.buffer();
    });
};

export const write = (token, handleId, dataBuffer) => {
  const url = `${IMMUT_DATA_ENDPOINT}${handleId}`;
  const payload = {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Length': dataBuffer.length,
      'Content-Type': 'text/plain'
    },
    body: dataBuffer
  };
  return fetch(url, payload)
    .then((response) => {
      if (response.status !== 200)
      {
        throw new Error({ error: 'Write Immutable Data failed with status ' + response.status + ' ' + response.statusText,
          errorPayload: payload,
          errorUrl : url
        });
      }
      return response;
    });
};

export const closeWriter = (token, handleId, cipherOptsHandle) => {
  const url = `${IMMUT_DATA_ENDPOINT}${handleId}/${cipherOptsHandle}`;
  const payload = {
    method: 'PUT',
    headers: {
      Authorization: 'Bearer ' + token
    }
  };
  return fetch(url, payload)
    .then((response) => {
      if (response.status !== 200)
      {
        throw new Error({ error: 'Close Immutable Data writer failed with status ' + response.status + ' ' + response.statusText,
          errorPayload: payload,
          errorUrl : url
        });
      }
      return parseResponse(response);
    });
};

export const dropReader = (token, handleId) => {
  const url = `${IMMUT_DATA_ENDPOINT}reader/${handleId}`;
  const payload = {
    method: 'DELETE'
  };
  if (token) {
    payload.headers = {
      Authorization: 'Bearer ' + token
    };
  }
  return fetch(url, payload)
    .then((response) => {
      if (response.status !== 200)
      {
        throw new Error({ error: 'Drop Immutable Data reader failed with status ' + response.status + ' ' + response.statusText,
          errorPayload: payload,
          errorUrl : url
        });
      }
      return response;
    });
};

export const dropWriter = (token, handleId) => {
  const url = `${IMMUT_DATA_ENDPOINT}writer/${handleId}`;
  const payload = {
    method: 'DELETE',
    headers: {
      Authorization: 'Bearer ' + token
    }
  };
  return fetch(url, payload)
    .then((response) => {
      if (response.status !== 200)
      {
        throw new Error({ error: 'Drop Immutable Data writer failed with status ' + response.status + ' ' + response.statusText,
          errorPayload: payload,
          errorUrl : url
        });
      }
      return response;
    });
};
