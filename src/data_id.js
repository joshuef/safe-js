'use strict';

import crypto from 'crypto';
import fetch from 'isomorphic-fetch';
import {parseResponse, SERVER} from './utils';

const DATA_ID_ENDPOINT = SERVER + 'data-id/';

export const manifest = {
  getAppendableDataHandle: 'promise',
  dropHandle             : 'promise'
};

export const getAppendableDataHandle = (token, name, isPrivate=false) => {
  const payload = {
    method: 'POST',
    body: {
      name: crypto.createHash('sha256').update(name).digest('base64'),
      isPrivate: isPrivate
    }
  };
  if (token) {
    payload.headers = {
      Authorization: 'Bearer ' + token
    };
  }
  const url = DATA_ID_ENDPOINT + 'appendable-data';
  fetch(url, payload)
    .then((response) => {
      if (response.status !== 200)
      {
        throw new Error( { error: 'Get DataId for AppendableData failed with status ' + response.status + ' ' + response.statusText,
          errorPayload: payload,
          errorUrl : url
        });
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
  const url = DATA_ID_ENDPOINT + handleId;
  fetch(url, payload)
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